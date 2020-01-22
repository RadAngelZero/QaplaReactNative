package com.qaplareactnative;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.segment.analytics.reactnative.core.RNAnalyticsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import org.reactnative.camera.RNCameraPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new NetInfoPackage(),
            new RNCameraPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseFunctionsPackage(),
            new RNFirebaseStoragePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNAnalyticsPackage(),
            new LinearGradientPackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(mCallbackManager),
            new SvgPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
