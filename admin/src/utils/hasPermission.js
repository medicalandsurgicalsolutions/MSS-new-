import { useSelector } from "react-redux";

// src/utils/hasPermission.js
const hasPermission = (permissions, permissionType, name) => {
  if (!permissions) return false;

  return permissions.some(
    (item) =>
      item.permission === permissionType &&
      item.name?.en?.toLowerCase() === name?.toLowerCase()
  );
};

export default hasPermission;
