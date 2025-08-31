import {
    TableBody,
    TableCell,
    TableRow,
  } from "@windmill/react-ui";
  import { t } from "i18next";
  import { FiZoomIn } from "react-icons/fi";
  import { Link } from "react-router-dom";
  
  //internal import
  import MainDrawer from "@/components/drawer/MainDrawer";
  import CheckBox from "@/components/form/others/CheckBox";
  import DeleteModal from "@/components/modal/DeleteModal";
  import EditDeleteButton from "@/components/table/EditDeleteButton";
  import ShowHideButton from "@/components/table/ShowHideButton";
  import Tooltip from "@/components/tooltip/Tooltip";
  import useToggleDrawer from "@/hooks/useToggleDrawer";
  import useUtilsFunction from "@/hooks/useUtilsFunction";
  import RoleAndPermissionDrawer from "../drawer/RoleAndPermissionDrawer";
import usePermission from "@/hooks/usePermission";
import ToggleStatusButton from "../table/ToggleStatusButton";
  
  //internal import
  
  const RoleAndPermissionTable = ({ roles, isCheck, setIsCheck }) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
    const { showingTranslateValue } = useUtilsFunction();
  
    const handleClick = (e) => {
      const { id, checked } = e.target;
  
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
      }
    };


    const { can, editButtonCLick, deleteButtonCLick } = usePermission("role", handleUpdate, handleModalOpen);
  
    return (
      <>
        {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}
  
        {isCheck?.length < 2 && (
          <MainDrawer>
            <RoleAndPermissionDrawer id={serviceId} />
          </MainDrawer>
        )}
  
        <TableBody>
          {roles?.map((role, i) => (
            <TableRow key={i + 1}>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name={showingTranslateValue(role?.name)}
                  id={role._id}
                  handleClick={handleClick}
                  isChecked={isCheck?.includes(role._id)}
                />
              </TableCell>
  
              <TableCell>
                <div className="flex items-center">
                  <div>
                    <h2
                      className={`text-sm font-medium`}
                    >
                      {showingTranslateValue(role?.name)}
                    </h2>
                  </div>
                </div>
              </TableCell>
  
              <TableCell>
                {can.list && (
                  <Link
                    to={`/roles-and-permission/${role._id}`}
                    className="flex justify-center text-gray-400 hover:text-emerald-600"
                  >
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("DetailsTbl")}
                      bgColor="#10B981"
                    />
                  </Link>
                )}
              </TableCell>
              <TableCell className="text-center">
                <ToggleStatusButton id={role._id} status={role.status} canToggleStatus={can.edit}/>
              </TableCell>
              <TableCell>
                  <EditDeleteButton
                    id={role._id}
                    isCheck={isCheck}
                    handleUpdate={editButtonCLick}
                    handleModalOpen={deleteButtonCLick}
                    title={showingTranslateValue(role?.name)}
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    );
  };
  
  export default RoleAndPermissionTable;
  