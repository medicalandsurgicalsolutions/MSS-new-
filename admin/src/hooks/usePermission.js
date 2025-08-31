import hasPermission from "@/utils/hasPermission";
import { notifyError } from "@/utils/toast";
import { useEffect, useState } from "react";

const usePermission = (name, editFunction = null, deleteFunction = null) => {
    
    const [can, setCan] = useState({ 
        add: true,
        edit: true,
        list: true,
        show: true,
        delete: true
    });


    const canDelete = hasPermission(name, "Delete");
    const canAdd = hasPermission(name, "Add");
    const canEdit = hasPermission(name, "Edit");
    const canList = hasPermission(name, "List");
    const canShow = hasPermission(name, "Show");


    useEffect(() => {
        setCan({
          add: canAdd,
          edit: canEdit,
          list: canList,
          show: canShow,
          delete: canDelete,
        });
    }, []);

    const deleteButtonCLick = (id, title, product) => {
        if (can.edit && deleteFunction != null) {
          deleteFunction(id, title, product);
        }else{
          notifyError("You don't have permission for this action.")
        }   
      }
  
    const editButtonCLick = (id) => {
        if (can.edit && editFunction != null) {
          editFunction(id);
        }else{
          notifyError("You don't have permission for this action.")
        }      
    }

    return {
        can,
        deleteButtonCLick,
        editButtonCLick
    }
}

export default usePermission;