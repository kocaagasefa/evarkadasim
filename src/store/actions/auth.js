import {
    SIGN_IN,
    SIGN_OUT,
    START_LOADING,
    FINISH_LOADING

} from './actionTypes';
import {
    startLoading,
    finishLoading} from './';
import firebase from 'react-native-firebase';
import {GoogleSignin} from 'react-native-google-signin';
import {AccessToken,LoginManager} from 'react-native-fbsdk';

import startTabs from '../../screens/Main/startTabs';
import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';
export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();

const googleSignInConfigure= {
    iosClientId:'',
    webClientId:"566945460977-3f0b00r1mg1ges8h5es161mpfu2no4di.apps.googleusercontent.com"
}
const signIn = user => {
    
    return {
        type:SIGN_IN,
        user
    }
}

const signOut = () => {
    return {
        type:SIGN_OUT
    }
}
export const signUp = (user) => {
    return dispatch => {
        return auth.createUserAndRetrieveDataWithEmailAndPassword(user.email,user.password)
                .then(data=>{
                    console.log("actions /auth / Sign Up ",data);
                })
    }
}
export const signInWithFacebook = () => {
    return dispatch => {
        
         LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(result=>{
                console.log("Login Manager Result",result);
                if(result.isCancelled)
                throw new Error("Cancelled by user");
                
                return AccessToken.getCurrentAccessToken();                
            })
            .then(data=>{
                console.log("get current Access token",data)
                if(!data)
                throw new Error("Couldn't get access token");

                return firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            })
            .then(credential =>{
                console.log("credential from firebase",credential)
               
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            })
            .then(user=>{
                console.log("From facebook",user);
                LoginManager.logOut();
            })
            .catch(error=>{
                console.log("error facebook login", error);
                
            })
    }

}
export const signInWithGoogle = () => {
    return dispatch => {
        dispatch(startLoading());

        GoogleSignin.configure(googleSignInConfigure)
        .then(()=>{
            return GoogleSignin.hasPlayServices({autoResolve:true})
        })
        .catch(err=>console.log(err))
        .then(()=>{
            return GoogleSignin.signIn();
        })
        .then(data=>{
            console.log("data:",data)
            return firebase.auth.GoogleAuthProvider.credential(data.idToken,data.accessToken)
        })
        .then(credentials=>{
            return auth.signInAndRetrieveDataWithCredential(credentials)            
        })
        .then(()=>{
            return GoogleSignin.signOut();  
        })
        .then(()=>dispatch(finishLoading()))
        .catch(error=>{
            dispatch(finishLoading());
            return console.log("error",error);
        })

    }
}

export const signInWithEmailAndPassword = (email,password) => {
    return dispatch => {
        dispatch(startLoading());
        return auth.signInAndRetrieveDataWithEmailAndPassword(email,password)
                .then(()=>dispatch(finishLoading()))
                .catch(error=>{
                    console.log("error on login",error);
                    dispatch(finishLoading());
                })
    }
}
export const signOutAsync = dispatch => {
    return dispatch => {
        dispatch(startLoading());
        auth.signOut()
        .then(()=>{
            dispatch(finishLoading());
            return dispatch(signOut());
        })
        .catch(error=> {
            dispatch(finishLoading());
            return console.log("SignOutError",error);
        })
    }
}

export const authStateChangedListener = () => {
    return dispatch => {
        dispatch(startLoading());
        return auth.onAuthStateChanged(user=>{
            console.log("actions/ authStateChanged/ autoLogin:",user);           

            if(user){
                database.ref("/users/"+user.uid).once("value").then(snapshot=>{
                    let userDetails=snapshot.val();
                    if(userDetails){
                        dispatch(signIn({
                            ...user._user,
                            userDetails
                        }));
                        dispatch(finishLoading());
                        return startTabs();
                    }
                    dispatch(finishLoading());
                    dispatch(signIn(user));
                    return Navigation.startSingleScreenApp({
                        screen:{
                            screen:"evarkadasim.SignUp",
                            title:"Kayıt Ol"
                        },
                        animationType:"slide-down"
                    })
                })
                .catch(error=>{
                    dispatch(finishLoading());
                    return console.log("GetUserData Error",error);
                });
            }
            dispatch(finishLoading());
            dispatch(signOut());

        })
    }
}

export const updateProfile=(profileData,additionalInfo,photo)=>{
    
    return dispatch => {
        dispatch(startLoading());

        updateProfilePhoto(photo)
            .then(
                snapshot=>{
                    let updateData= {...profileData}
                    
                    if(snapshot&&snapshot.downloadURL){
                        updateData.photoURL= snapshot.downloadURL;
                    }
                    return auth.currentUser.updateProfile({
                        ...updateData
                        });
                }
            )
        .then(()=>{
            return database.ref("users/"+auth.currentUser.uid)
                .set(additionalInfo)
            .then(()=>{
                dispatch(finishLoading());
                startTabs();
                console.log("additional data saved to db");
            })
            .catch(error=>{
                dispatch(finishLoading());
                console.log("error while updating profile",error);
            });

        })
        .catch(error=>{
            dispatch(finishLoading());
            console.log("error",error);
        })

    }
}

const updateProfilePhoto=(photo)=>{
    if(!photo){
        return new Promise((resolve)=>{
            console.log("no photo");
            return resolve();
        });
    }
    let fileName= firebase.storage.Native.CACHES_DIRECTORY_PATH +photo.substring(photo.indexOf("/react"));
    if (Platform.OS === 'android') {
        fileName = fileName.replace('file:/', '');
    }
    
    return storage.ref().child("/profile_photos/"+auth.currentUser.uid+"/profilePhoto.jpg")
        .putFile(fileName,{contentType:"image/jpeg"})
}