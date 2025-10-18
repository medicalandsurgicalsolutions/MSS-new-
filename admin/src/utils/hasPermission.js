import { useSelector } from "react-redux";

const hasPermission = (name, action) => {
  const settings = useSelector((state) => state.setting.settingItem);

  if (!settings || !Array.isArray(settings)) {
    console.warn("⚠️ No settings found in Redux state.");
    return false;
  }

  const permissionSetting = settings.find(
    (item) => item.name === "permissionSetting"
  );

  if (!permissionSetting || !permissionSetting.permissions) {
    console.warn("⚠️ permissionSetting not found in settings.");
    return false;
  }

  const has = permissionSetting.permissions.some(
    (perm) =>
      perm.permission === name &&
      perm.name?.en?.toLowerCase() === action.toLowerCase()
  );

  console.log(`Checking permission: ${name} → ${action} =`, has);
  return has;
};

export default hasPermission;
