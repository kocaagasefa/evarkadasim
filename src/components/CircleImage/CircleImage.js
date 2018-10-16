import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const circleImage = props => (
    <View>           
        <Image style={[styles.image,{
        width:props.radius,
        height:props.radius,
        borderRadius:props.radius/2
    }]} source={props.source}/>
        {
        props.addIcon?
        <TouchableOpacity  
            style={[styles.addImageButtonWrapper,{
                bottom:-props.radius*2/14,
            }]} 
            onPress={props.addIcon}>
            <Text style={[styles.addImageButton,{
                fontSize:props.radius*2/5
            }]}>+</Text>
        </TouchableOpacity>:null}
    </View>
);

const styles=StyleSheet.create({
    image:{
       
    },
    addImageButtonWrapper:{
        position:"absolute",
        right:0,
        padding:0
    },
    addImageButton:{
        fontWeight:"bold"
        
    }
});


export default circleImage;
