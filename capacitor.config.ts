import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.karaoke.app",
  appName: "MXQ Karaoke",
  webDir: "dist",
  server: {
    androidScheme: "https",
    cleartext: true,
  },
  android: {
    useLegacyStorage: true,
    backgroundColor: "#000000",
    screenOrientation: "landscape",
    hideLogs: true,
    webContentsDebuggingEnabled: false,
    allowMixedContent: true,
    initialFocus: false,
    // Optimize for TV boxes
    hardwareAcceleration: false,
    targetSdkVersion: 31,
    minSdkVersion: 19,
    compileSdkVersion: 33,
    buildToolsVersion: "33.0.0",
    overrideUserAgent: "MXQ-PRO-4K",
    appendUserAgent: "MXQ-PRO-4K",
    networkSecurityConfig: "@xml/network_security_config",
  },
};

export default config;
