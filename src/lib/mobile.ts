// Mobile app setup and wake lock functionality
export const setupMobileApp = async () => {
  try {
    // Dynamically import Capacitor modules only when needed
    const { App } = await import("@capacitor/app");
    const { StatusBar } = await import("@capacitor/status-bar");
    const { Keyboard } = await import("@capacitor/keyboard");

    // Hide the status bar
    try {
      await StatusBar.hide();
    } catch (e) {
      console.warn("Status bar hide failed:", e);
    }

    // Always exit app on back button for TV boxes
    App.addListener("backButton", () => {
      App.exitApp();
    });

    // Handle keyboard events
    Keyboard.addListener("keyboardWillShow", () => {
      document.body.classList.add("keyboard-visible");
    });

    Keyboard.addListener("keyboardWillHide", () => {
      document.body.classList.remove("keyboard-visible");
    });
  } catch (error) {
    console.warn("Mobile setup failed:", error);
  }
};

// Wake lock API wrapper
export const useWakeLock = () => {
  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        // @ts-ignore - Experimental API
        const wakeLock = await navigator.wakeLock.request("screen");
        return wakeLock;
      }
    } catch (err) {
      console.warn("Wake Lock error:", err);
    }
    return null;
  };

  return { requestWakeLock };
};
