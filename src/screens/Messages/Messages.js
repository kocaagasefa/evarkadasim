import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class Messages extends Component {
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = event => {
        if(event.type==="NavBarButtonPress"){
            if(event.id==="sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:"left"
                });
            }
        }

    }
    render(){
        return (
            <View>
                <Text>This is Messages Screen</Text>
            </View>
        )
    }
}

export default Messages;