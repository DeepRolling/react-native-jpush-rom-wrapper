# react-native-jpush-rom-wrapper

use following command to download package :
```text
yarn add react-native-jpush-rom-wrapper
```


integration of serveral custom rom push servers,base on [offical jpush-react-native library](https://github.com/jpush/jpush-react-native)(2.8.7)

* android jpush library : v4.2.8
* ios jpush library : v3.7.4


# Instructions of integrate system-level push service

## Android platform

### Preface
You need add some proguard rules for jpush-react-native library if you need proguard in your project

```code
#for jpush official sdk
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontnote
-verbose

-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.app.IntentService
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider
-keep public class * extends android.app.backup.BackupAgentHelper
-keep public class * extends android.preference.Preference
-keep public class com.android.vending.licensing.ILicensingService

-dontwarn cn.jpush.**
-keep class cn.jpush.** { *; }
```

### HUAWEI message service(HMS)

Add following code in AndroidManifest.xml of app module:

```js
        <meta-data
            android:name="com.huawei.hms.client.appid"
            android:value="${HUAWEI_APPID}"/>
        <meta-data
            android:name="com.huawei.hms.client.cpid"
            android:value="${HUAWEI_CP_ID}"/>
```

Add following code in build.gradle of app module:
```code
      defaultConfig {
             manifestPlaceholders = [
                 HUAWEI_APPID: "xxxxxxxxxx",        //华为appid
                 HUAWEI_CP_ID: "xxxxxxxxxxxxxxxx"           //华为cp_id    //华为cp_id
             ]
         }
```

Add following code in proguard file if you use proguard :
```
#for jpush huawei sdk
-ignorewarning
-keepattributes *Annotation*
-keepattributes Exceptions
-keepattributes InnerClasses
-keepattributes Signature
-keepattributes SourceFile,LineNumberTable
-keep class com.hianalytics.android.**{*;}
-keep class com.huawei.updatesdk.**{*;}
-keep class com.huawei.hms.**{*;}
```
The last step you need to do for make HMS work is download the **agconnect-services.json** from huawei developer official website  and put it to root of app module

> Notice : After these steps , you also need create a project in AppGallery Connect and add the application you created to this project  ,  then you need go to **${your project} -> push server -> config** and open the switch to get things work ! ! !

### OPPO push service

Add following code in build.gradle of app module:
```code
      defaultConfig {
             manifestPlaceholders = [
                OPPO_APPKEY   : "xxxxxxxx",//jpush oppo system level push configuration
                OPPO_APPID    : "xxxxxxxx",//jpush oppo system level push configuration
                OPPO_APPSECRET: "xxxxxxxx",//jpush oppo system level push configuration
             ]
         }
```

Add following code in proguard file if you use proguard :
```
#for jpush oppo sdk
-dontwarn com.coloros.mcsdk.**
-keep class com.coloros.mcsdk.** { *; }

-dontwarn com.heytap.**
-keep class com.heytap.** { *; }

-dontwarn com.mcs.**
-keep class com.mcs.** { *; }
```

### XIAOMI push service

Add following code in build.gradle of app module:
```code
      defaultConfig {
             manifestPlaceholders = [
                XIAOMI_APPKEY : "MI-您的应用对应的小米的APPKEY", //jpush xiaomi system level push configuration
                XIAOMI_APPID  : "MI-您的应用对应的小米的APPID", //jpush xiaomi system level push configuration
             ]
         }
```

Add following code in proguard file if you use proguard :
```
#for jpush xiaomi sdk
-dontwarn com.xiaomi.push.**
-keep class com.xiaomi.push.** { *; }
```

Override the android receiver component in Manifest
```
<!--jpush xiaomi configuration need ensure the receiver run in host-process-->
        <receiver
            android:name="cn.jpush.android.service.PushReceiver"
            tools:node="replace"
            android:enabled="true">
            <intent-filter android:priority="1000">
                <action android:name="cn.jpush.android.intent.NOTIFICATION_RECEIVED_PROXY" />
                <!--Required  显示通知栏 -->
                <category android:name="${applicationId}" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.USER_PRESENT" />
                <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
            </intent-filter>
            <!-- Optional -->
            <intent-filter>
                <action android:name="android.intent.action.PACKAGE_ADDED" />
                <action android:name="android.intent.action.PACKAGE_REMOVED" />

                <data android:scheme="package" />
            </intent-filter>
        </receiver>
```

### VIVO push service

Add following code in build.gradle of app module:
```code
      defaultConfig {
             manifestPlaceholders = [
                VIVO_APPKEY : "您的应用对应的VIVO的APPKEY", //jpush vivo system level push configuration
                VIVO_APPID : "您的应用对应的VIVO的APPID", //jpush vivo system level push configuration
             ]
         }
```

Add following code in proguard file if you use proguard :
```
#for jpush vivo sdk
-dontwarn com.vivo.push.**
-keep class com.vivo.push.**{*; }
-keep class com.vivo.vms.**{*; }
```

### MEIZU push service

Add following code in build.gradle of app module:
```code
      defaultConfig {
             manifestPlaceholders = [
                MEIZU_APPKEY : "MZ-0956b96085d54c6087b85c7994b02ddf",  //jpush meizu system level push configuration
                MEIZU_APPID : "MZ-110443", //jpush meizu system level push configuration
             ]
         }
```

Add following code in proguard file if you use proguard :
```
#for jpush meizu sdk
-dontwarn com.meizu.cloud.**
-keep class com.meizu.cloud.** { *; }
```

### ASUS push service

Add following code in AndroidManifest.xml of app module:

```js
        <receiver android:name="cn.jpush.android.asus.AsusPushMessageReceiver" />
```


#Addition

If you disallow backup in your main module manifest file , when you compile this library you will get error :
```text
Execution failed for task ':app:processDevelopDebugMainManifest'.
> Manifest merger failed : Attribute application@allowBackup value=(false) from AndroidManifest.xml:24:9-36
   is also present at [cn.jiguang.sdk.plugin:huawei:4.2.8] AndroidManifest.xml:12:9-35 value=(true).
   Suggestion: add 'tools:replace="android:allowBackup"' to <application> element at AndroidManifest.xml:7:5-12:19 to override.

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

```
You can abandon your backup option or override HUAWEI library backup option by replace tools , it's up to you .

## IOS platform

The steps of config certifications already descripted in Jpush [offical document](https://docs.jiguang.cn/jpush/client/iOS/ios_cer_guide/) , but when I follow these step I also find some place maybe anbiguous :

* when you import the downloaded Apple Push services certificate  to key-chain manager in your macos  , you maybe found there **not have option can let you export the certificate as .p12 format** . You need following the instraction exactly  , open key-chain manager ( delete the imported certificate first if you already import ) , click **My certificates -> Login** , then click **the certificate you download from Apple developer** to import this to key chains , then you will found this option .

After that ,  you need add some code to AppDelegate.m file to register listeners to ios system , refer to example in [offical jpush-react-native library](https://github.com/jpush/jpush-react-native)

## License

MIT
