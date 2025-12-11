https://tailwindcss.com/docs/color

https://gluestack.io/ui/docs/components/icon

https://www.freepik.com/icons

https://github.com/gluestack/gluestack-ui/blob/main/src/docs/apps/dashboard-app/index.mdx

https://icons.expo.fyi/Index

https://react-beginner-7qki.vercel.app/                                                                                                                   

 https://oblador.github.io/react-native-vector-icons/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
import { Image } from 'react-native';
 <Image
source={p.img}
resizeMode="cover"
style={{width: '100%', height: '100%'}}
/>


import { Image } from "@/components/ui/image"; 
<Image
source={p.img}
className="w-full h-36"
resizeMode="cover"
/>


npx expo install expo-sqlite
npx expo install expo-sqlite


# 안드로이드 빌드 초기
npx expo prebuild


apk
gradlew assembleRelease

gradlew assembleDebug


# 빌드 오류나면 해당 파일 설정
# ############## app.json
{
  "expo": {
    "name": "starter-kit-expo",
    "slug": "starter-kit-expo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "starterkitexpo",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.momo_seungmo.starterkitexpo"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-web-browser",
      "expo-font",
      [
        "expo-sqlite",
        {
          "enableFTS": true,
          "useSQLCipher": true,
          "android": {
            "enableFTS": false,
            "useSQLCipher": false
          },
          "ios": {
            "customBuildFlags": [
              "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1"
            ]
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "bd09bd32-4bbe-4ae2-a107-c736fc26a76b"
      }
    },
    "reactNative": {
      "fabricEnabled": false
    },
  }
}


# ############## app/build.gradle

android {
    ndkVersion rootProject.ext.ndkVersion

    buildToolsVersion rootProject.ext.buildToolsVersion
    compileSdk rootProject.ext.compileSdkVersion

    namespace 'com.momo_seungmo.starterkitexpo'
    defaultConfig {
        applicationId 'com.momo_seungmo.starterkitexpo'
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0.0"

        buildConfigField "String", "REACT_NATIVE_RELEASE_LEVEL", "\"${findProperty('reactNativeReleaseLevel') ?: 'stable'}\""
        ndk {
            abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
        }
    }
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            def enableShrinkResources = findProperty('android.enableShrinkResourcesInReleaseBuilds') ?: 'false'
            // shrinkResources enableShrinkResources.toBoolean()
            // minifyEnabled enableMinifyInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            def enablePngCrunchInRelease = findProperty('android.enablePngCrunchInReleaseBuilds') ?: 'true'
            crunchPngs enablePngCrunchInRelease.toBoolean()

            minifyEnabled false
            shrinkResources false
        }
    }
    packagingOptions {
        jniLibs {
            def enableLegacyPackaging = findProperty('expo.useLegacyPackaging') ?: 'false'
            useLegacyPackaging enableLegacyPackaging.toBoolean()
        }

        pickFirsts.add('lib/armeabi-v7a/libfb.so')
        pickFirsts.add('lib/arm64-v8a/libfb.so')
        pickFirsts.add('lib/x86/libfb.so')
        pickFirsts.add('lib/x86_64/libfb.so')
        doNotStrip '**/*.so'
    }
    androidResources {
        ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:!CVS:!thumbs.db:!picasa.ini:!*~'
    }
}

# ##############  gradle.properties
# Project-wide Gradle settings.

# IDE (e.g. Android Studio) users:
# Gradle settings configured through the IDE *will override*
# any settings specified in this file.

# For more details on how to configure your build environment visit
# http://www.gradle.org/docs/current/userguide/build_environment.html

# Specifies the JVM arguments used for the daemon process.
# The setting is particularly useful for tweaking memory settings.
# Default value: -Xmx512m -XX:MaxMetaspaceSize=256m
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

# When configured, Gradle will run in incubating parallel mode.
# This option should only be used with decoupled projects. More details, visit
# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
org.gradle.parallel=true

# AndroidX package structure to make it clearer which packages are bundled with the
# Android operating system, and which are packaged with your app's APK
# https://developer.android.com/topic/libraries/support-library/androidx-rn
android.useAndroidX=true

# Enable AAPT2 PNG crunching
android.enablePngCrunchInReleaseBuilds=true

# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64

# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
newArchEnabled=true

# Use this property to enable or disable the Hermes JS engine.
# If set to false, you will be using JSC instead.
hermesEnabled=true

# Use this property to enable edge-to-edge display support.
# This allows your app to draw behind system bars for an immersive UI.
# Note: Only works with ReactActivity and should not be used with custom Activity.
edgeToEdgeEnabled=true

# Enable GIF support in React Native images (~200 B increase)
expo.gif.enabled=true
# Enable webp support in React Native images (~85 KB increase)
expo.webp.enabled=true
# Enable animated webp support (~3.4 MB increase)
# Disabled by default because iOS doesn't support animated webp
expo.webp.animated=false

# Enable network inspector
EX_DEV_CLIENT_NETWORK_INSPECTOR=true

# Use legacy packaging to compress native libraries in the resulting APK.
expo.useLegacyPackaging=false

# Specifies whether the app is configured to use edge-to-edge via the app config or plugin
# WARNING: This property has been deprecated and will be removed in Expo SDK 55. Use `edgeToEdgeEnabled` or `react.edgeToEdgeEnabled` to determine whether the project is using edge-to-edge.
expo.edgeToEdgeEnabled=true

expo.sqlite.enableFTS=false
expo.sqlite.useSQLCipher=false

# ############## proguard-rules.pro

