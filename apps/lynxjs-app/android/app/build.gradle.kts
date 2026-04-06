plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.github.ah584d.lynxjs"
    compileSdk = 34
    // can't be updated to 15+ because of 16kb page issue
    
    defaultConfig {
        applicationId = "com.github.ah584d.lynxjs"
        minSdk = 29
        targetSdk = 34  // Keep at 34 until Lynx SDK fixes 16KB alignment issue
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        
        // Workaround for 16KB page size issue in Lynx SDK native libraries
        ndk {
            abiFilters += listOf("arm64-v8a", "armeabi-v7a")
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }

    packaging {
        jniLibs {
            useLegacyPackaging = false
        }
    }

    // check version with
    // ls ~/Library/Android/sdk/ndk
    // ndkVersion = "29.0.14033849" // 👈 put your installed NDK version here
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)

    // lynx dependencies
    implementation("org.lynxsdk.lynx:lynx:3.4.1")
    implementation("org.lynxsdk.lynx:lynx-jssdk:3.4.1")
    implementation("org.lynxsdk.lynx:lynx-trace:3.4.1")
    implementation("org.lynxsdk.lynx:primjs:2.14.1")

    // integrating image-service
    implementation("org.lynxsdk.lynx:lynx-service-image:3.4.1")

    // image-service dependencies, if not added, images cannot be loaded; if the host APP needs to use other image libraries, you can customize the image-service and remove this dependency
    implementation("com.facebook.fresco:fresco:2.3.0")
    implementation("com.facebook.fresco:animated-gif:2.3.0")
    implementation("com.facebook.fresco:animated-webp:2.3.0")
    implementation("com.facebook.fresco:webpsupport:2.3.0")
    implementation("com.facebook.fresco:animated-base:2.3.0")

    // integrating log-service
    implementation("org.lynxsdk.lynx:lynx-service-log:3.4.1")

    // integrating http-service
    implementation("org.lynxsdk.lynx:lynx-service-http:3.4.1")

    implementation("com.squareup.okhttp3:okhttp:4.9.0")

    // integrating XElement
    implementation("org.lynxsdk.lynx:xelement:3.4.1")
    implementation("org.lynxsdk.lynx:xelement-input:3.4.1")
}
