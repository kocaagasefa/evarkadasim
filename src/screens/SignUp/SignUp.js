import React, {Component} from 'react';
import {
    View,
    Button
} from 'react-native';
import CustomInput from '../../components/UI/CustomInput/CustomInput';

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
    onSignUpHandler= () => {
        const user= {}
        const formElements= this.state.formElements;
        for(let key in formElements)
        {user[key] = formElements[key].value;}
        this.props.signUp(user);
    }

    render(){
        return (
            <View>
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
        );
    }
}

const mapDispatchToProps= dispatch=> {
    return {
        signUp:user=> dispatch(signUp(user))
    }
    
}

export default connect(null,mapDispatchToProps)(SignUp);