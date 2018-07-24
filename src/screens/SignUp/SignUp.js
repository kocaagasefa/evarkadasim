import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import CustomInput from '../../components/UI/CustomInput/CustomInput';
import CircleImage from '../../components/CircleImage/CircleImage';

import {connect} from 'react-redux';
import {signUp} from '../../store/actions/'

import {formDataUpdate} from '../../utils/utils';
import CustomButton from '../../components/UI/CustomButton/CustomButton';

class SignUp extends Component {
    state={
        formElements:{
            name:{
                isValid:false,
                value:"",
                touched:false,
                validityRules:{
                    minLength:2
                }
            },
            surname:{
                isValid:false,
                value:"",
                touched:false,
                validityRules:{
                    minLength:2
                }
            },
            email:{
                isValid:false,
                value:"",
                touched:false,
                validityRules:{
                    isEmail:true
                }
            },
            profilePhoto:{
                isValid:false,
                value:null
            },
            birthday:{
                isValid:false,
                value:null,
                validityRules:{
                    isDate:true
                }
            },
            password:{
                isValid:false,
                value:"",
                touched:false,
                validityRules:{
                    minLength:6
                }
            },
            confirmPassword:{
                isValid:false,
                value:"",
                touched:false,
                validityRules:{
                    equalTo:""
                }
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
                formElements:formDataUpdate(prevState.formElements,value,key)
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
            <View style={{flex:1}} >
            <KeyboardAvoidingView enabled >
            <ScrollView 
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                >  

                <View style={styles.formContainer}>  
                    <CircleImage radius={200} source={this.state.formElements.profilePhoto.value} addIcon={this.imagePickerHandler} />
                    <View style={styles.inputsContainer}>
                    <CustomInput 
                        placeholder="İsim" 
                        value={this.state.formElements.name.value}
                        invalid={!this.state.formElements.name.isValid}
                        touched={this.state.formElements.name.touched}
                        onChangeText={value=>this.onChangeTextHandler(value,"name")}/>
                    <CustomInput 
                        placeholder="Soyisim" 
                        value={this.state.formElements.surname.value}
                        invalid={!this.state.formElements.surname.isValid}
                        touched={this.state.formElements.surname.touched}
                        onChangeText={value=>this.onChangeTextHandler(value,"surname")}/>
                    <CustomInput 
                        placeholder="Email" 
                        value={this.state.formElements.email.value}
                        invalid={!this.state.formElements.email.isValid}
                        touched={this.state.formElements.email.touched}
                        onChangeText={value=>this.onChangeTextHandler(value,"email")}/>
                    <CustomInput 
                        placeholder="Parola" 
                        value={this.state.formElements.password.value}
                        invalid={!this.state.formElements.password.isValid}
                        touched={this.state.formElements.password.touched}
                        onChangeText={value=>this.onChangeTextHandler(value,"password")}/>
                    <CustomInput 
                        placeholder="Parola tekrarı" 
                        value={this.state.formElements.confirmPassword.value}
                        invalid={!this.state.formElements.confirmPassword.isValid}
                        touched={this.state.formElements.confirmPassword.touched}
                        onChangeText={value=>this.onChangeTextHandler(value,"confirmPassword")}/>
                    <CustomInput 
                        placeholder="Parola tekrarı" 
                        value={this.state.formElements.confirmPassword.value}
                        invalid={!this.state.formElements.confirmPassword.isValid}
                        touched={this.state.formElements.confirmPassword.touched}
                        onChangeText={value=>this.onChangeTextHandler(value,"confirmPassword")}/>
                    <CustomInput 
                        placeholder="Parola tekrarı" 
                        value={this.state.formElements.confirmPassword.value}
                        invalid={!this.state.formElements.confirmPassword.isValid}
                        touched={this.state.formElements.confirmPassword.touched}
                        onChangeText={value=>this.onChangeTextHandler(value,"confirmPassword")}/>
                    <CustomButton 
                        background="#444"
                        onPress={this.onSignUpHandler} 
                        title="Kayıt Ol!" />
                    </View>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        backgroundColor:"#a8dde0"
    },
    formContainer:{
        flex:1,
        width:"80%",
        alignItems:"center",           
        justifyContent:"center",
        paddingBottom:30
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