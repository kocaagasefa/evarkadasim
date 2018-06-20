import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    ImageBackground,
    StyleSheet
} from 'react-native';
import CustomInput from '../../components/UI/CustomInput/CustomInput';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import {signInWithGoogle,authStateChangedListener,signInWithEmailAndPassword} from '../../store/actions/';

import {GoogleSigninButton} from 'react-native-google-signin';

import backgroundImage from '../../assets/login-bg-pic.jpg';

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
            Title:"Kayıt Ol"
        });
    }
    render () {

        if(this.props.isLoading)
        return <ActivityIndicator size="large"/>  
        let googleSignInButton = (
            <GoogleSigninButton 
                                style={{width: "100%", height: 60}}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}                                
                                onPress={this.props.signInWithGoogle}/>
        );
        return (
            <ImageBackground 
                source={backgroundImage} 
                style={styles.background}
                imageStyle={styles.backgroundImageStyle}
                blurRadius={0.8}
                >
            <View style={styles.container}>
            <View style={styles.emailPasswordContainer}>
                <CustomInput onChangeText={text=>this.onTextChangedHandler(text,"email")}/>
                <CustomInput onChangeText={text=>this.onTextChangedHandler(text,"password")}/>
                <Button title="GİRİŞ" onPress={this.signInWithEmailAndPassword}/>
            </View>
                <Button title="Kayıt için tıklayınız" onPress={this.goToSignUpScreen}/>
                {googleSignInButton}
            </View>
            </ImageBackground>
        )
    }
}

const styles= StyleSheet.create({
    background:{
        flex:1,
        width:"100%"
    },
    backgroundImageStyle:{
        resizeMode:"cover",
        marginLeft:-140,
        marginTop:-50,
        backgroundColor:"orange"
    },
    container:{
        flex:1,
        margin:0,
        padding:0,
        justifyContent:"space-between",
        alignItems:"center"
    },
    emailPasswordContainer:{
        width:"80%",
        marginTop:150
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
        signInWithEmailAndPassword:(email,password)=>dispatch(signInWithEmailAndPassword(email,password)),
        authStateChanged : () => dispatch(authStateChangedListener())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);