import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {signOutAsync} from '../../store/actions';

class SideDrawer extends Component {
    logoutHandler=()=>{
        this.props.signOut();
        Navigation.startSingleScreenApp({
            screen:{
              screen:"evarkadasim.Auth",
              title:"Giriş Yap"
            }
          })
    }
    componentDidMount(){
        console.log(this.props.user);
    }
    render () {
        let {displayName,photoURL} = this.props.user || {displayName:null,photoURL:null}
        return (
            <View style={[styles.container,{width:Dimensions.get("window").width*0.8}]}>
                <Image source={{uri:photoURL}} style={styles.profilePhoto} />
                <Text style={styles.name}>{displayName}</Text>
                <TouchableOpacity onPress={()=>{}}>
                    <View style={[styles.menuContainer,{width:Dimensions.get("window").width*0.8}]}>
                        <Icon name="md-mail" size={30} color="red" />
                        <Text style={styles.logoutText}>Mesajlarım</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logoutHandler}>
                    <View style={[styles.menuContainer,{width:Dimensions.get("window").width*0.8}]}>
                        <Icon name="md-log-out" size={30} color="red" />
                        <Text style={styles.logoutText}>Çıkış Yap</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingTop:30,
        alignItems:'center',
        flex:1
    },
    name:{
        fontSize:16,
        fontWeight:"bold"
    },
    menuContainer:{
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        backgroundColor:"#eee",
        marginTop:10
    },
    logoutText:{
        marginLeft:10,
        color:"black"
    },
    profilePhoto:{
        width:100,
        height:100,
        borderRadius:50,
        marginBottom:30
        
    }
})
const mapStateToProps = state => {
    return {
        user:state.auth.user
    }
}

const mapDispatchToProps= dispatch => {
    return {
        signOut : () => dispatch (signOutAsync())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SideDrawer);