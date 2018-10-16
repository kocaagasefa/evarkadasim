import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

const customButton = props => {
    let icon= null;
    if(props.icon){
        icon=React.cloneElement(
            props.icon,
            {
                size:28,
                color:"white",
                style:styles.iconStyle
            });
    }
    return (
        <TouchableOpacity 
            style={[styles.container,{
                backgroundColor:props.background||"transparent"
            },props.disabled?styles.disabled:null]}
            onPress={props.disabled?()=>{}:props.onPress}>
            {icon}
            <Text style={[styles.textContainer,props.disabled?styles.textDisabled:null]}>
                <Text style={styles.title}>{props.title}</Text>
                <Text>{props.children}</Text>
            </Text>
        </TouchableOpacity>
    );
}

const styles=StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:"#000",
        borderRadius:10,
        padding:5,
        flexDirection:"row",
        marginTop:5,
        marginBottom:5,
        alignItems:"center"
    },
    textContainer:{
        flex:1,
        textAlign:"center",
        color:"white",
        padding:5
    },
    textDisabled:{
        color:"#ccc"
    },
    title:{
        fontWeight:"bold"
    },
    iconStyle:{
        paddingRight:5
    },
    disabled:{
        backgroundColor:"#eee"
    }
})

export default customButton;