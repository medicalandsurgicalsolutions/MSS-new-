import hasPermission from "@/utils/hasPermission";
import { notifyError } from "@/utils/toast";
import { useEffect, useState } from "react";

const usePermission = (name, editFunction = null, deleteFunction = null) => {
  const [can, setCan] = useState({
    add: false,
    edit: false,
    list: false,
    show: false,
    delete: false,
  });

  useEffect(() => {
    console.log("usePermission called for:", name);

    const canDelete = hasPermission(name, "Delete");
    const canAdd = hasPermission(name, "Add");
    const canEdit = hasPermission(name, "Edit");
    const canList = hasPermission(name, "List");
    const canShow = hasPermission(name, "Show");

    const permissionObject = {
      add: canAdd,
      edit: canEdit,
      list: canList,
      show: canShow,
      delete: canDelete,
    };

    console.log("Resolved permissions:", permissionObject);
    setCan(permissionObject);
  }, [name]);

  const deleteButtonClick = (id, title, product) => {
    if (can.delete && deleteFunction) {
      deleteFunction(id, title, product);
    } else {
      notifyError("You don't have permission to delete.");
    }
  };

  const editButtonClick = (id) => {
    if (can.edit && editFunction) {
      editFunction(id);
    } else {
      notifyError("You don't have permission to edit.");
    }
  };

  return {
    can,
    deleteButtonClick,
    editButtonClick,
  };
};

export default usePermission;
