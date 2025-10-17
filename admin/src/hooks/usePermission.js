import hasPermission from "@/utils/hasPermission"; // keep same import
import { notifyError } from "@/utils/toast";

const usePermission = (name, editFunction = null, deleteFunction = null) => {
  const canAdd = hasPermission(name, "Add");
  const canEdit = hasPermission(name, "Edit");
  const canList = hasPermission(name, "List");
  const canShow = hasPermission(name, "Show");
  const canDelete = hasPermission(name, "Delete");

  const can = { add: canAdd, edit: canEdit, list: canList, show: canShow, delete: canDelete };

  const deleteButtonClick = (id, title, product) => {
    if (can.edit && deleteFunction) {
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
