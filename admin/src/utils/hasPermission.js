// hasPermission.js
import { useSelector } from "react-redux";

const useHasPermission = (permission, name) => {
  const settings = useSelector((state) => state.setting.settingItem);

  const permissions = settings?.find(
    (value) => value.name === "permissionSetting"
  )?.permissions;

  if (!permissions) return false;

  return permissions.some(
    (item) => item.permission === permission && item.name.en === name
  );
};

export default useHasPermission;
