import { TableBody, TableCell, TableRow, Badge } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import usePermission from "@/hooks/usePermission";
import ToggleStatusButton from "../table/ToggleStatusButton";
import RatingDrawer from "../drawer/RatingDrawer";

const RatingTable = ({
    data,
    isCheck,
    ratings,
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

    const { can, editButtonCLick, deleteButtonCLick } = usePermission("rating", handleUpdate, handleModalOpen);


    return (
        <>
            {isCheck?.length < 1 && (
                <DeleteModal id={serviceId} title={title} />
            )}

            <MainDrawer>
                <RatingDrawer id={serviceId} data={data} />
            </MainDrawer>

            <TableBody>
                {ratings?.map((rating) => (
                    <TableRow key={rating._id}>
                        <TableCell>
                            <CheckBox
                                type="checkbox"
                                name="rating"
                                id={rating._id}
                                handleClick={handleClick}
                                isChecked={isCheck?.includes(rating._id)}
                            />
                        </TableCell>

                        <TableCell className="font-semibold uppercase text-xs">
                            {rating?._id?.substring(20, 24)}
                        </TableCell>

                        <TableCell className="font-medium text-sm ">
                            <span>{rating?.customer?.name || ""}</span>
                        </TableCell>
                        <TableCell className="text-sm">
                            {showingTranslateValue(rating?.product?.title)}
                        </TableCell>
                        <TableCell className="text-sm">
                            <Badge type="success">{rating.rating} Star</Badge>
                        </TableCell>
                        <TableCell className="text-sm whitespace-normal">
                            {rating.comment}
                        </TableCell>
                        <TableCell className="text-center">
                            <ToggleStatusButton id={rating._id} status={rating.status} canToggleStatus={can.edit}/>
                        </TableCell>
                        <TableCell>
                            <EditDeleteButton
                                id={rating?._id}
                                isCheck={isCheck}
                                handleUpdate={editButtonCLick}
                                handleModalOpen={deleteButtonCLick}
                                title={showingTranslateValue(rating?.title)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default RatingTable;
