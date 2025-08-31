import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";

//internal import
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import CurrencyDrawer from "@/components/drawer/CurrencyDrawer";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import usePermission from "@/hooks/usePermission";
import ToggleStatusButton from "../table/ToggleStatusButton";
// import { SidebarContext } from '../context/SidebarContext';

const CurrencyTable = ({ currency, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  // console.log('currency',currency)

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const { can, editButtonCLick, deleteButtonCLick } = usePermission("currency", handleUpdate, handleModalOpen);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      <MainDrawer>
        <CurrencyDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {currency?.map((currency) => (
          <TableRow key={currency._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={currency.symbol}
                id={currency._id}
                handleClick={handleClick}
                isChecked={isCheck.includes(currency._id)}
              />
            </TableCell>

            <TableCell className="text-center">
              <span className="font-medium text-sm">{currency.name}</span>
            </TableCell>

            {/* <TableCell className="text-center">
              <span className="font-medium text-sm">{currency.iso_code}</span>
            </TableCell> */}

            <TableCell className="text-center">
              <span className="font-medium text-sm">{currency.symbol}</span>
            </TableCell>

            <TableCell className="text-center">
              <ToggleStatusButton id={currency._id} status={currency.status} currencyStatusName={"status"} canToggleStatus={can.edit}/>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                title={currency.name}
                id={currency._id}
                handleUpdate={editButtonCLick}
                handleModalOpen={deleteButtonCLick}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CurrencyTable;
