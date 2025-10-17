import useHasPermission from "@/utils/hasPermission"; // same import
import { notifyError } from "@/utils/toast";

const usePermission = (name, editFunction = null, deleteFunction = null) => {
  const canAdd = useHasPermission(name, "Add");
  const canEdit = useHasPermission(name, "Edit");
  const canList = useHasPermission(name, "List");
  const canShow = useHasPermission(name, "Show");
  const canDelete = useHasPermission(name, "Delete");

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
