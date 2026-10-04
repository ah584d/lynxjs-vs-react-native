# Development Notes

## Android Dependency Upgrade (apps/lynxjs-app/android) 2

### Key blocker
`compileSdk`/`targetSdk` are pinned to **34** because **Lynx SDK 3.4.1** ships native
`.so` libraries (`liblynx.so`, `liblynx_v8_bridge.so`, `liblynxtrace.so`) that are **not
16KB-page aligned**. This caps every AndroidX library at its last SDK‑34‑compatible
release. The Lynx SDK — not Gradle — is the real upgrade gate.

Documented in [gradle.properties](apps/lynxjs-app/android/gradle.properties) and
[app/build.gradle.kts](apps/lynxjs-app/android/app/build.gradle.kts).

### Upgraded (stays within compileSdk 34)
Applied in [gradle/libs.versions.toml](apps/lynxjs-app/android/gradle/libs.versions.toml):

| Dependency | Before | After |
| --- | --- | --- |
| androidx.core:core-ktx | 1.10.1 | 1.13.1 |
| androidx.appcompat | 1.6.1 | 1.7.1 |
| com.google.android.material | 1.10.0 | 1.12.0 |
| androidx.test.ext:junit | 1.1.5 | 1.2.1 |
| androidx.test.espresso:espresso-core | 3.5.1 | 3.6.1 |

Validated with `./gradlew :app:assembleDebug` → BUILD SUCCESSFUL.

### Intentionally left as-is
- **Gradle 8.13 / AGP 8.13.0 / Kotlin 2.0.21** — already current and mutually matched;
  bumping Gradle/AGP alone adds risk with no real benefit. (Optional, low value:
  Gradle 8.14.3 + AGP 8.14.x.)
- **core 1.15+, material 1.13+, appcompat 1.8+** — all require `compileSdk 35`, blocked
  by the Lynx 16KB alignment issue.

### To unlock bigger upgrades (compileSdk 35, AGP 9.x / Gradle 9.x)
1. Upgrade Lynx SDK to a release that fixes 16KB alignment.
2. Raise `compileSdk`/`targetSdk` to 35.
3. Then bump core → 1.17+, material → 1.13+, appcompat → 1.7.1 (or 1.8 if raising
   minSdk to 23).

### Current build facts
- Gradle wrapper: 8.13; AGP: 8.13.0; Kotlin: 2.0.21
- JDK: 21 (daemon JVM pinned via `gradle/gradle-daemon-jvm.properties`)
- minSdk: 29; Java/Kotlin target: 11; abiFilters: `arm64-v8a`, `armeabi-v7a`
- Lynx SDK: `org.lynxsdk.lynx:* 3.4.1` (hardcoded in `app/build.gradle.kts`)
