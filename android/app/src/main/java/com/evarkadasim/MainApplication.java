package com.evarkadasim;

import android.app.Application;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

 import com.reactnativenavigation.NavigationApplication;
 import com.oblador.vectoricons.VectorIconsPackage;

    import io.invertase.firebase.RNFirebasePackage;
    import io.invertase.firebase.auth.RNFirebaseAuthPackage;
    import co.apptailor.googlesignin.RNGoogleSigninPackage;
    import io.invertase.firebase.database.RNFirebaseDatabasePackage;

 public class MainApplication extends NavigationApplication {

     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return BuildConfig.DEBUG;
     }

     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
             new VectorIconsPackage(),
             new RNFirebasePackage(),
             new RNFirebaseAuthPackage(),
             new RNGoogleSigninPackage(),
             new RNFirebaseDatabasePackage()
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
