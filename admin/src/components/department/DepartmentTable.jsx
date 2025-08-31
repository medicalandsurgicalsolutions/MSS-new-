import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import DepartmentDrawer from "../drawer/DepartmentDrawer";
import usePermission from "@/hooks/usePermission";
import ToggleStatusButton from "../table/ToggleStatusButton";

const DepartmentTable = ({
    data,
    isCheck,
    departments,
    setIsCheck,
}) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
    const { showingTranslateValue } = useUtilsFunction();

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    const { can, editButtonCLick, deleteButtonCLick } = usePermission("department", handleUpdate, handleModalOpen);


    return (
        <>
            {isCheck?.length < 1 && (
                <DeleteModal id={serviceId} title={title} />
            )}

            <MainDrawer>
                <DepartmentDrawer id={serviceId} data={data} />
            </MainDrawer>

            <TableBody>
                {departments?.map((department) => (
                    <TableRow key={department._id}>
                        <TableCell>
                            <CheckBox
                                type="checkbox"
                                name="department"
                                id={department._id}
                                handleClick={handleClick}
                                isChecked={isCheck?.includes(department._id)}
                            />
                        </TableCell>

                        <TableCell className="font-semibold uppercase text-xs">
                            {department?._id?.substring(20, 24)}
                        </TableCell>

                        <TableCell className="font-medium text-sm ">
                            <span>{showingTranslateValue(department?.name)}</span>
                        </TableCell>
                        <TableCell className="text-sm">
                            {showingTranslateValue(department?.description)}
                        </TableCell>

                        <TableCell className="text-center">
                            <ToggleStatusButton id={department._id} status={department.status} canToggleStatus={can.edit}/>
                        </TableCell>
                        <TableCell>
                            <EditDeleteButton
                                id={department?._id}
                                isCheck={isCheck}
                                handleUpdate={editButtonCLick}
                                handleModalOpen={deleteButtonCLick}
                                title={showingTranslateValue(department?.title)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default DepartmentTable;
