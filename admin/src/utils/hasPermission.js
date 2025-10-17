import { useSelector } from "react-redux";

/**
 * Returns the current list of permissions from Redux state
 * This is now a proper custom hook that can be used in other hooks/components
 */
const hasPermission = () => {
  // Get settings from Redux
  const settings = useSelector((state) => state.setting.settingItem);

  // Find the "permissionSetting" object
  const permissions = settings?.find(
    (value) => value.name === "permissionSetting"
  )?.permissions;

  // Return the permissions array or an empty array if none found
  return permissions || [];
};

export default hasPermission;
