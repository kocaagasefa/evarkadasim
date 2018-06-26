import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {CustomInput,CustomButton} from '../../components/UI/';
import {connect} from 'react-redux';
import {
    signInWithGoogle,
    signInWithFacebook,
    authStateChangedListener,
    signInWithEmailAndPassword} from '../../store/actions/';

import backgroundImage from '../../assets/login-bg-pic.jpg';
import Icon from 'react-native-vector-icons/Ionicons';

class Auth extends Component {
    state= {
        formElements:{
            email:{
                value:"",
                isValid:false
            },
            password:{
                value:"",
                isValid:false
            }
        }
    }
    static navigatorStyle={
        navBarHidden:true
    }
    componentDidMount(){
        this.authStateChanged = this.props.authStateChanged();
    }
    componentWillUnmount(){
       // this.authStateChanged();
    }
    onTextChangedHandler = (text,key) => {
        this.setState(prevState=>{
            return {
                ...prevState,
                formElements:{
                    ...prevState.formElements,
                    [key]:{
                        ...prevState.formElements[key],
                        value:text
                    }
                }
            }
        })
    }
    signInWithEmailAndPassword= ()=> {
        this.props.signInWithEmailAndPassword(
            this.state.formElements.email.value,
            this.state.formElements.password.value
        );
    }
    goToSignUpScreen= () =>{
        this.props.navigator.push({
            screen:"evarkadasim.SignUp",
            title:"Kayıt Ol",
            animationType:"slide-horizontal"
        });
    }
    render () {

        if(this.props.isLoading)
        return <ActivityIndicator size="large"/>  
        return (

            <View style={styles.container}>
                <View style={styles.emailPasswordContainer}>
                    <CustomInput 
                        icon={<Icon name="md-at" />}
                        onChangeText={text=>this.onTextChangedHandler(text,"email")}/>
                    <CustomInput 
                        icon={<Icon name="md-key" />}
                        onChangeText={text=>this.onTextChangedHandler(text,"password")}/>
                    <CustomButton 
                        title="GİRİŞ" 
                        background="#444"
                        onPress={this.signInWithEmailAndPassword}/>
                </View>
                <View style={styles.socialLogin}>
                    <CustomButton
                        title="Facebook"
                        icon={<Icon name="logo-facebook" />}
                        background="#3b5998"
                        onPress={this.props.signInWithFacebook}> ile giriş yap</CustomButton>
                    <CustomButton
                        title="Google"
                        icon={<Icon name="logo-google" />}
                        background="#d34836"
                        onPress={this.props.signInWithGoogle}> ile giriş yap</CustomButton>
                </View>
                <View style={styles.signup}>
                    <Text style={styles.signupText}> TARUS ile aradığın evi veya ev arkadaşını kolayca bulabilmek için giriş yap</Text>
                    <TouchableOpacity onPress={this.goToSignUpScreen}>
                        <Text style={styles.signupText}>
                            <Text>Kayıtlı değilsen kolayca</Text>
                            <Text style={styles.signupButton}> Kayıt Ol</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        margin:0,
        padding:0,
        justifyContent:"flex-end",
        alignItems:"center",
        backgroundColor:"#a8dde0"
    },
    emailPasswordContainer:{
        width:"80%"
    },
    socialLogin:{
        width:"80%",
        marginTop:30
    },
    signup:{
        margin:10,
        marginTop:30,
        padding:10
    },
    signupText:{
        fontSize:16,
        fontWeight:"bold",
        color:"white",
        textAlign:"center",
        marginBottom:10
    },
    signupButton:{
        color:"#4286f4"
    }
})
const mapStateToProps = state => {
    return {
        isLoading:state.ui.isLoading,
        user:state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signInWithGoogle : () => dispatch(signInWithGoogle()),
        signInWithFacebook: () => dispatch(signInWithFacebook()),
        signInWithEmailAndPassword:(email,password)=>dispatch(signInWithEmailAndPassword(email,password)),
        authStateChanged : () => dispatch(authStateChangedListener())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);