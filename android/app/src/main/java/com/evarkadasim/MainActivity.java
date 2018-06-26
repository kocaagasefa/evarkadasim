package com.evarkadasim;
import android.content.Intent;

 import com.reactnativenavigation.controllers.SplashActivity;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
 public class MainActivity extends SplashActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
 }