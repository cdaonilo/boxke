export const requestStoragePermission = async () => {
  if (typeof window !== "undefined" && "Capacitor" in window) {
    await requestStoragePermissionNative();
  }
};

const requestStoragePermissionNative = async () => {
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (Capacitor.getPlatform() === "android") {
      const { Permissions } = Capacitor;
      const result = await Permissions.query({
        name: "storage" as any,
      });

      if (result.state === "prompt") {
        await Permissions.request({
          name: "storage" as any,
        });
      }
    }
  } catch (error) {
    console.error("Error requesting storage permission:", error);
  }
};
