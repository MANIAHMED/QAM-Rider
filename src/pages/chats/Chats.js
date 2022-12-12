import React, { Component } from 'react'
import { Text, View, ScrollView, AppState } from 'react-native'
import { styles } from './Chats.style'
import { Container, Content } from 'native-base'
import Header from '../../components/Header/Header'
import i18n from './../../i18n'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { themeColor, lightTextColor, textColor, backgroundColor } from '../../constants'
import { SendChat, GetChats } from '../../helpers/apis'
import CustomToast from '../../components/Toast/Toast'
import Loader from '../../components/Loader/Loader'
import { connect, useDispatch, useSelector } from 'react-redux'
import { updateExtra } from '../../store/middlewares/extra.middleware'

function Chats ({order, updateExtra, user, lng, openControlPanel, loading, error  }) {


    const dispatch = useDispatch()

    const [messages, setMessages] = useState()
    const [userId, setUserId] = useState();

    const reduxState = useSelector((states) => {
        return {
            loading: states.extras.loading,
            error: states.extras.error,
            user: states.user
        }
    });

    const { error, loading, user} = reduxState;


   
    useEffect(() => {
        fetchOrderChat()
        handleSocketMessages()
        AppState.addEventListener('change', this.handleAppStateChange)


        return () => AppState.removeEventListener('change', this.handleAppStateChange)


    }, []);

   

   
   const handleAppStateChange = async () => {
        if (AppState.currentState == 'active') {
            fetchOrderChat()
        }
    }


  const  fetchOrderChat = async () => {
        // let { } = this.props
        try {
            dispatch( updateExtra({ loading: true }))
            let response = await GetChats(order.order_id)
            let chats = response.data.data
            let messages = []
            chats.forEach((chat, ind) => {
                let { id, rider_id, sent_by, message } = chat
                if (rider_id == user.id) {
                    let messageObj = {
                        _id: id,
                        text: message,
                        user: {
                            _id: sent_by == 'rider' ? user.id : 'C',
                            name: "C"
                        }
                    }
                    messages.push(messageObj)
                }
            })
          setMessages(messages)
        } catch (error) {
            dispatch( updateExtra({ error: error.message || (error.data && error.data.message) || 'Something went wrong.' }))
        } finally {
            dispatch( updateExtra({ loading: false }))
        }
    }

  const  handleSocketMessages = () => {
  
        socket.on(order.order_id + ',chatcustomer', (data) => {
            let { id, created_at, sender_id, rider_id, order_id, sent_by, message } = data
            let messageObj = {
                _id: id,
                text: message,
                user: {
                    _id: "C",
                    name: "C"
                }
            }
            setMessages(previousState => (GiftedChat.append(...previousState,[messageObj] )))


        })
    }

  const  onSend = async (message = []) => {
        if (message.length) {
           dispatch( updateExtra({ loading: true }))
            message = message[0]
            try {
                let res = await SendChat({
                    message: message.text,
                    sent_by: 'rider',
                    order_id: order.order_id
                })
                delete message.createdAt
                setMessages(previousState => (GiftedChat.append(...previousState,[message] )))


                let toPost = res.data.data
                socket.emit('chat', toPost)
            } catch (error) {
               dispatch( updateExtra({ error: error.message || (error.data && error.data.message) || 'Something went wrong.' }))
            } finally {
                dispatch( updateExtra({ loading: false }))
            }
        }
    }

   const renderBubble = (props) => {
        return (
            <View style={[styles.bubble, { backgroundColor: props.currentMessage.user._id == userId ? themeColor : lightTextColor }]} >
                <Text style={[styles.messageText, { color: props.currentMessage.user._id == userId ? backgroundColor : textColor }]} >{props.currentMessage.text}</Text>
            </View>
        )
    }

  const  handleToastClose = () => {
       dispatch( updateExtra({ error: '' }))
    }



        return (
            <Container style={styles.container} >
                {
                    error !== '' &&
                    <CustomToast text={error} duration={3000} onClose={this.handleToastClose} />
                }
                <Loader loading={loading} />
                <Header title={'Chat'} lng={lng} leftButtonType={'back'} showWallet={false} openControlPanel={openControlPanel} />
                <Content scrollEnabled={false} contentContainerStyle={{ width: '100%', height: '100%' }}>
                    <GiftedChat
                        messages={messages}
                        showUserAvatar={false}
                        renderBubble={this.renderBubble}
                        alwaysShowSend
                        onSend={message => this.onSend(message)}
                        user={{
                            _id: userId,
                        }}
                    />
                </Content>
            </Container>
        )
    }




export default Chats