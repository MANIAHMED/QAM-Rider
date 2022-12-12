import React from 'react'
import Drawer from 'react-native-drawer';
import DrawerView from './../uiComponents/Drawer/Drawer';

function DrawerNavigation () {


    const closeControlPanel = () => {
        this._drawer.close()
    };

    const openControlPanel = () => {
        this._drawer.open()
    };


    return (
        <Drawer
            content={
                <DrawerView closeControlPanel={closeControlPanel} />
            }
            ref={(ref) => this._drawer = ref}
            type="static"
            tapToClose={true}
            acceptPan
            openDrawerOffset={0.2}
            styles={drawerStyles}
            tweenHandler={Drawer.tweenPresets.parallax}
        >
            {
                React.cloneElement(props.children, {
                    ...props,
                    closeControlPanel: closeControlPanel,
                    openControlPanel: openControlPanel
                })
            }
        </Drawer>

    )
}

export default DrawerNavigation;

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { elevation: 1 },
}

