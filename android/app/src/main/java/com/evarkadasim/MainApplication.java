package com.evarkadasim;

import android.app.Application;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

 import com.reactnativenavigation.NavigationApplication;
 import com.oblador.vectoricons.VectorIconsPackage;
 import com.reactnative.ivpusic.imagepicker.PickerPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.soloader.SoLoader;

import android.content.Intent;
import com.reactnativenavigation.controllers.ActivityCallbacks;

 public class MainApplication extends NavigationApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return BuildConfig.DEBUG;
     }
    @Override
    public void onCreate() {
        super.onCreate();
        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                mCallbackManager.onActivityResult(requestCode, resultCode, data);
            }
        });
        FacebookSdk.sdkInitialize(getApplicationContext());
        SoLoader.init(this, /* native exopackage */ false);
    }

     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
             new VectorIconsPackage(),
             new RNFirebasePackage(),
             new RNFirebaseAuthPackage(),
             new RNGoogleSigninPackage(),
             new RNFirebaseDatabasePackage(),
             new PickerPackage(),
             new FBSDKPackage(mCallbackManager)
         );
     }

     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }

      @Override
      public String getJSMainModuleName() {
        return "index";
      }
 }
