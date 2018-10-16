import firebase from 'react-native-firebase';
import {GoogleSignin} from 'react-native-google-signin';

const auth= firebase.auth();

export const googleLogin = () => {
  GoogleSignin.configure({
    iosClientId:'',
    webClientId:"566945460977-3f0b00r1mg1ges8h5es161mpfu2no4di.apps.googleusercontent.com"
})
.then(()=>GoogleSignin.signIn())
    .then(data=>{ 
    console.log("data:",data);
    return firebase.auth.GoogleAuthProvider.credential(data.idToken,data.accessToken)
})
.then(credentials=>{
    console.log(credentials)
    return auth.signInAndRetrieveDataWithCredential(credentials);
}
).then(user=>{
    console.log(user);
    return user;
}).        
catch(err=>alert("Error:"+JSON.stringify(err)));

}

export const signOut = () => {
  return firebase.auth().signOut().then(
    ()=>{
      return GoogleSignin.signOut();
    })
    .catch(console.log);
}
