// src/hooks/usePermission.js
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import hasPermission from "@/utils/hasPermission";
import { notifyError } from "@/utils/toast";

const usePermission = (name, editFunction = null, deleteFunction = null) => {
  const settings = useSelector((state) => state.setting.settingItem);
  const permissions = settings?.find(
    (value) => value.name === "permissionSetting"
  )?.permissions;

  const [can, setCan] = useState({
    add: false,
    edit: false,
    list: false,
    show: false,
    delete: false,
  });

  useEffect(() => {
    const canDelete = hasPermission(permissions, "Delete", name);
    const canAdd = hasPermission(permissions, "Add", name);
    const canEdit = hasPermission(permissions, "Edit", name);
    const canList = hasPermission(permissions, "List", name);
    const canShow = hasPermission(permissions, "Show", name);

    setCan({
      add: canAdd,
      edit: canEdit,
      list: canList,
      show: canShow,
      delete: canDelete,
    });

    console.log("Permission check for:", name, {
      canAdd,
      canEdit,
      canList,
      canShow,
      canDelete,
    });
  }, [permissions, name]);

  const deleteButtonClick = (id, title, product) => {
    if (can.delete && deleteFunction) {
      deleteFunction(id, title, product);
    } else {
      notifyError("You don't have permission for this action.");
    }
  };

  const editButtonClick = (id) => {
    if (can.edit && editFunction) {
      editFunction(id);
    } else {
      notifyError("You don't have permission for this action.");
    }
  };

  return { can, deleteButtonClick, editButtonClick };
};

export default usePermission;
