import React from 'react';
import {TextInput,StyleSheet} from 'react-native';

const customInput = props =>(
    <TextInput 
        {...props} 
        style= {[styles.input,props.style,props.invalid&&props.touched?styles.invalid:null]}
        underlineColorAndroid="transparent" 
        />
);

const styles=StyleSheet.create({
    input:{
        width:"100%",
        borderWidth:1,
        borderColor:"#eee",
        marginTop:8,
        marginBottom:8,
        padding:5
    },
    invalid:{
        backgroundColor:'#f9c0c0',
        borderColor:"red",
        borderWidth:1
    }
})

export default customInput;