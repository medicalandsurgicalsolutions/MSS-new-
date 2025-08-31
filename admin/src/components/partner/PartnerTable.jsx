import { TableBody, Avatar, TableCell, TableRow, Badge } from "@windmill/react-ui";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import usePermission from "@/hooks/usePermission";
import ToggleStatusButton from "../table/ToggleStatusButton";
import BrandDrawer from "../drawer/BrandDrawer";
import ClientDrawer from "../drawer/ClientDrawer";
import PartnerDrawer from "../drawer/PartnerDrawer";

const PartnerTable = ({
    data,
    isCheck,
    partners,
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

    const { can, editButtonCLick, deleteButtonCLick } = usePermission("brand", handleUpdate, handleModalOpen);

    const openNewTab = (url) => {
        window.open(url, '_blank');
    };

    return (
        <>
            {isCheck?.length < 1 && (
                <DeleteModal id={serviceId} title={title} />
            )}

            <MainDrawer>
                <PartnerDrawer id={serviceId} data={data} />
            </MainDrawer>

            <TableBody>
                {partners?.map((brand) => (
                    <TableRow key={brand._id}>
                        <TableCell>
                            <CheckBox
                                type="checkbox"
                                name="brand"
                                id={brand._id}
                                handleClick={handleClick}
                                isChecked={isCheck?.includes(brand._id)}
                            />
                        </TableCell>

                        <TableCell className="font-semibold uppercase text-xs">
                            {brand?._id?.substring(20, 24)}
                        </TableCell>

                        <TableCell className="font-medium text-sm ">
                            <span>{showingTranslateValue(brand?.name)}</span>
                        </TableCell>
                        <TableCell>
                            {brand?.icon ? (
                                <Avatar
                                    className="hidden mr-3 md:block bg-gray-50 p-1"
                                    src={brand?.icon}
                                    alt={brand?.name?.en}
                                />
                            ) : (
                                <Avatar
                                    src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                    alt="product"
                                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                                />
                            )}
                        </TableCell>
                        <TableCell className="text-sm">
                            <button onClick={e => openNewTab(brand?.website)}>
                                <Badge type="success">Visit</Badge>
                            </button>
                        </TableCell>

                        {/* <TableCell className="text-center">
                            <ToggleStatusButton id={brand._id} status={brand.status} canToggleStatus={can.edit}/>
                        </TableCell> */}
                        <TableCell>
                            <EditDeleteButton
                                id={brand?._id}
                                isCheck={isCheck}
                                handleUpdate={editButtonCLick}
                                handleModalOpen={deleteButtonCLick}
                                title={showingTranslateValue(brand?.title)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default PartnerTable;
