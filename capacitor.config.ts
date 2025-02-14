import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.karaoke.app",
  appName: "MXQ Karaoke",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  android: {
    backgroundColor: "#000000",
    screenOrientation: "landscape",
    hideLogs: true,
    webContentsDebuggingEnabled: false,
    allowMixedContent: true,
    initialFocus: false,
    // Optimize for TV boxes
    hardwareAcceleration: false,
    targetSdkVersion: 29, // Android 10
    minSdkVersion: 24, // Android 7
    compileSdkVersion: 29,
    buildToolsVersion: "29.0.3",
    overrideUserAgent: "MXQ-PRO-4K",
  },
};

export default config;
