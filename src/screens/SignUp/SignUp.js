import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import CustomInput from '../../components/UI/CustomInput/CustomInput';
import CircleImage from '../../components/CircleImage/CircleImage';

import {connect} from 'react-redux';
import {signUp} from '../../store/actions/'

class SignUp extends Component {
    state={
        formElements:{
            name:{
                isValid:false,
                value:""
            },
            surname:{
                isValid:false,
                value:""
            },
            email:{
                isValid:false,
                value:""
            },
            profilePhoto:{
                isValid:false,
                value:null
            },
            birthday:{
                isValid:false,
                value:null
            },
            password:{
                isValid:false,
                value:""
            }
        }
    }
    componentDidMount(){
        if(!this.state.formElements.profilePhoto.value){
            Icon.getImageSource("md-contact",300,"white")
                .then(image=>{
                    console.log("Icon image",image);
                    this.setState(prevState=>{
                        return {
                            ...prevState,
                            formElements:{
                                ...prevState.formElements,
                                profilePhoto:{
                                    ...prevState.formElements.profilePhoto,
                                    value:image
                                }
                            }
                        }
                    })
                })
        }
    }
    onChangeTextHandler= (value,key) => {
        this.setState(prevState=>{
            return {
                ...prevState,
                formElements:{
                    ...prevState.formElements,
                    [key]:{
                        ...prevState.formElements[key],
                        value
                    }
                }
            }
        })
    }
    imagePickerHandler = () => {
        ImagePicker.openPicker({
            width:300,
            height:300,
            cropping:true,
            cropperCircleOverlay:true,
            cropperToolbarTitle:"Kırp",
            includeBase64:true
        }).then(response=>{
            console.log(response)
            const image={
                uri:response.path,
                base64:response.data
            }
            this.setState(prevState=>{
                return {
                    ...prevState,
                    formElements:{
                        ...prevState.formElements,
                        profilePhoto:{
                            ...prevState.formElements.profilePhoto,
                            value:image
                        }
                    }
                }
            })
        })
    }
    onSignUpHandler= () => {
        const user= {}
        const formElements= this.state.formElements;
        for(let key in formElements)
        {user[key] = formElements[key].value;}
        this.props.signUp(user);
    }

    render(){
        
        return (
            <View style={styles.container}>  
                <View style={styles.formContainer}>  
                    <CircleImage radius={200} source={this.state.formElements.profilePhoto.value} addIcon={this.imagePickerHandler} />
                    <View style={styles.inputsContainer}>
                    <CustomInput 
                        placeholder="İsim" 
                        value={this.state.formElements.name.value}
                        onChangeText={value=>this.onChangeTextHandler(value,"name")}/>
                    <CustomInput 
                        placeholder="Soyisim" 
                        value={this.state.formElements.surname.value}
                        onChangeText={value=>this.onChangeTextHandler(value,"surname")}/>
                    <CustomInput 
                        placeholder="Email" 
                        value={this.state.formElements.email.value}
                        onChangeText={value=>this.onChangeTextHandler(value,"email")}/>
                    <CustomInput 
                        placeholder="Parola" 
                        value={this.state.formElements.password.value}
                        onChangeText={value=>this.onChangeTextHandler(value,"password")}/>
                    <Button onPress={this.onSignUpHandler} title="Kayıt Ol!" />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center"
    },
    formContainer:{
        flex:1,
        width:"80%",
        alignItems:"center",           
        justifyContent:"center"
    },
    inputsContainer:{
        width:"100%"
    }
})
const mapDispatchToProps= dispatch=> {
    return {
        signUp:user=> dispatch(signUp(user))
    }
    
}

export default connect(null,mapDispatchToProps)(SignUp);