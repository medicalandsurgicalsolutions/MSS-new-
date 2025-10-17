import hasPermission from "@/utils/hasPermission";
import { notifyError } from "@/utils/toast";

/**
 * Custom hook to handle permissions and edit/delete functions
 * @param {string} name - permission name for the current module
 * @param {function|null} editFunction - optional edit callback
 * @param {function|null} deleteFunction - optional delete callback
 */
const usePermission = (name, editFunction = null, deleteFunction = null) => {
  const permissions = hasPermission(); // get permissions from Redux

  // Utility to check if a specific permission exists
  const check = (permName) =>
    permissions.some(
      (item) => item.permission === name && item.name.en === permName
    );

  const can = {
    add: check("Add"),
    edit: check("Edit"),
    list: check("List"),
    show: check("Show"),
    delete: check("Delete"),
  };

  // Handler for delete action
  const deleteButtonClick = (id, title, product) => {
    if (can.edit && deleteFunction) {
      deleteFunction(id, title, product);
    } else {
      notifyError("You don't have permission for this action.");
    }
  };

  // Handler for edit action
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
