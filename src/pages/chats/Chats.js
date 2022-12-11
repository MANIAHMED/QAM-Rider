// import React, { Component } from 'react'
// import { Text, View, ScrollView, AppState } from 'react-native'
// import Style from './ChatStyle'
// import Header from '../../containers';
// import i18n from './../../i18n';
// import { GiftedChat, Bubble } from 'react-native-gifted-chat'
// import { themeColor, lightTextColor, textColor, backgroundColor } from '../../utils/constant'
// import { SendChat, GetChats } from '../../helpers/apis'
// // import CustomToast from '../../components/Toast/Toast'
// // import Loader from '../../components/Loader/Loader'
// // import { connect } from 'react-redux'
// // import { updateExtra } from '../../store/middlewares/extra.middleware'

// class Chats extends Component {
//     // constructor(props) {
//     //     super(props)
//     //     this.state = {
//     //         messages: [],
//     //         userId: props.user.id
//     //     }
//     // }


//     async componentDidMount() {
//         await this.fetchOrderChat()
//         this.handleSocketMessages()
//         AppState.addEventListener('change', this.handleAppStateChange)
//     }

//     componentWillUnmount() {
//         AppState.removeEventListener('change', this.handleAppStateChange)
//     }

//     handleAppStateChange = async () => {
//         if (AppState.currentState == 'active') {
//             await this.fetchOrderChat()
//         }
//     }

//     fetchOrderChat = async () => {
//         let { order, updateExtra, user } = this.props
//         try {
//             updateExtra({ loading: true })
//             let response = await GetChats(order.order_id)
//             let chats = response.data.data
//             let messages = []
//             chats.forEach((chat, ind) => {
//                 let { id, rider_id, sent_by, message } = chat
//                 if (rider_id == user.id) {
//                     let messageObj = {
//                         _id: id,
//                         text: message,
//                         user: {
//                             _id: sent_by == 'rider' ? user.id : 'C',
//                             name: "C"
//                         }
//                     }
//                     messages.push(messageObj)
//                 }
//             })
//             this.setState({
//                 messages,
//             })
//         } catch (error) {
//             updateExtra({ error: error.message || (error.data && error.data.message) || 'Something went wrong.' })
//         } finally {
//             updateExtra({ loading: false })
//         }
//     }

//     handleSocketMessages = () => {
//         let { order, user } = this.props
//         socket.on(order.order_id + ',chatcustomer', (data) => {
//             let { id, created_at, sender_id, rider_id, order_id, sent_by, message } = data
//             let messageObj = {
//                 _id: id,
//                 text: message,
//                 user: {
//                     _id: "C",
//                     name: "C"
//                 }
//             }
//             this.setState(previousState => ({
//                 messages: GiftedChat.append(previousState.messages, [messageObj]),
//             }))

//         })
//     }

//     onSend = async (message = []) => {
//         let { order, updateExtra } = this.props
//         if (message.length) {
//             updateExtra({ loading: true })
//             message = message[0]
//             try {
//                 let res = await SendChat({
//                     message: message.text,
//                     sent_by: 'rider',
//                     order_id: order.order_id
//                 })
//                 delete message.createdAt
//                 this.setState(previousState => ({
//                     messages: GiftedChat.append(previousState.messages, [message]),
//                 }))

//                 let toPost = res.data.data
//                 socket.emit('chat', toPost)
//             } catch (error) {
//                 updateExtra({ error: error.message || (error.data && error.data.message) || 'Something went wrong.' })
//             } finally {
//                 updateExtra({ loading: false })
//             }
//         }
//     }

//     renderBubble = (props) => {
//         const { userId } = this.state
//         return (
//             <View style={[styles.bubble, { backgroundColor: props.currentMessage.user._id == userId ? themeColor : lightTextColor }]} >
//                 <Text style={[styles.messageText, { color: props.currentMessage.user._id == userId ? backgroundColor : textColor }]} >{props.currentMessage.text}</Text>
//             </View>
//         )
//     }

//     handleToastClose = () => {
//         let { updateExtra } = this.props
//         updateExtra({ error: '' })
//     }

//     render() {
//         const { lng, openControlPanel, loading, error } = this.props
//         const { messages, userId } = this.state

//         return (
//             <Container style={styles.container} >
//                 {
//                     error !== '' &&
//                     <CustomToast text={error} duration={3000} onClose={this.handleToastClose} />
//                 }
//                 <Loader loading={loading} />
//                 <Header title={'Chat'} lng={lng} leftButtonType={'back'} showWallet={false} openControlPanel={openControlPanel} />
//                 <Content scrollEnabled={false} contentContainerStyle={{ width: '100%', height: '100%' }}>
//                     <GiftedChat
//                         messages={messages}
//                         showUserAvatar={false}
//                         renderBubble={this.renderBubble}
//                         alwaysShowSend
//                         onSend={message => this.onSend(message)}
//                         user={{
//                             _id: userId,
//                         }}
//                     />
//                 </Content>
//             </Container>
//         )
//     }
// }

// function mapStateToProps(states) {
//     return {
//         loading: states.extras.loading,
//         error: states.extras.error,
//         user: states.user
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         updateExtra: (extra) => dispatch(updateExtra(extra)),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Chats)

import React, { useEffect, useState } from 'react';
import React, { Component } from 'react'
import { Text, View, ScrollView, AppState } from 'react-native'
import Style from './ChatStyle'
import Header from '../../containers';
import i18n from './../../i18n';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { themeColor, lightTextColor, textColor, backgroundColor } from '../../utils/constant'
import { SendChat, GetChats } from '../../helpers/apis'

function Chats() {

    const [messages, setMessages] = useState()
    const [userId, setUserId] = useState();

    useEffect(() => {
        fetchOrderChat()
        handleSocketMessages()
        AppState.addEventListener('change', this.handleAppStateChange)


        return () => AppState.removeEventListener('change', this.handleAppStateChange)


    }, []);


    handleAppStateChange = async () => {
        if (AppState.currentState == 'active') {
            fetchOrderChat()
        }
    }



    fetchOrderChat = async () => {
        let { order, updateExtra, user } = this.props
        try {
            updateExtra({ loading: true })
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
            updateExtra({ error: error.message || (error.data && error.data.message) || 'Something went wrong.' })
        } finally {
            updateExtra({ loading: false })
        }
    }

    handleSocketMessages = () => {
                let { order, user } = this.props
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

            onSend = async (message = []) => {
                        let { order, updateExtra } = this.props
                        if (message.length) {
                            updateExtra({ loading: true })
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
                                updateExtra({ error: error.message || (error.data && error.data.message) || 'Something went wrong.' })
                            } finally {
                                updateExtra({ loading: false })
                            }
                        }
                    }

                    renderBubble = (props) => {
                                return (
                                    <View style={[styles.bubble, { backgroundColor: props.currentMessage.user._id == userId ? themeColor : lightTextColor }]} >
                                        <Text style={[styles.messageText, { color: props.currentMessage.user._id == userId ? backgroundColor : textColor }]} >{props.currentMessage.text}</Text>
                                    </View>
                                )
                            }

                            handleToastClose = () => {
                                        let { updateExtra } = this.props
                                        updateExtra({ error: '' })
                                    }

    return (
        <div>Chats</div>
    )
}

export default Chats