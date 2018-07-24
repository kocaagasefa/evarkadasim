import React from 'react';
import {TextInput,StyleSheet,View} from 'react-native';


const customInput = props =>{
    let icon= null;
    if(props.icon){
        icon=React.cloneElement(
            props.icon,
            {
                size:22,
                color:"white",
                style:styles.iconStyle
            });
    }
    return (
    <View style={[styles.container,props.style,props.invalid&&props.touched?styles.invalid:null]}>   
    {icon} 
    <TextInput 
        {...props} 
        style= {styles.input}
        underlineColorAndroid="transparent" 
        />
    </View>
)};

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#000",
        borderRadius:10,
        marginTop:5,
        marginBottom:5,
        padding:5
    },
    input:{
        flex:1,
        margin:0,
        padding:0
    },
    invalid:{
        backgroundColor:'#f9c0c0',
        borderColor:"red"
        },
    iconStyle:{
        paddingRight:5,
        borderRightColor:"black",
        borderRightWidth:1,
        marginRight:3
    }
})

export default customInput;