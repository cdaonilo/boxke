import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.karaoke.app",
  appName: "TV Karaoke",
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
  },
};

export default config;
