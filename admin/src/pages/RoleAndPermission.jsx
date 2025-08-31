import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import {FiTrash2 } from "react-icons/fi";

//internal import

import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import TableLoading from "@/components/preloader/TableLoading";
import AnimatedContent from "@/components/common/AnimatedContent";
import RoleAndPermissionTable from "@/components/role-and-permissions/RoleAndPermissionTable";
import RoleAndPermissionServices from "@/services/RoleAndPermissionServices";
import useFilter from "@/hooks/useFilter";
import RoleAndPermissionDrawer from "@/components/drawer/RoleAndPermissionDrawer";
import usePermission from "@/hooks/usePermission";



const RoleAndPermission = () => {
  const { title, allId, serviceId, handleDeleteMany } = useToggleDrawer();

  const { t } = useTranslation();
  const { toggleDrawer } = useContext(SidebarContext);

  const { data, loading, error } = useAsync(RoleAndPermissionServices.getAllRoles);

  const { can } = usePermission("role");  

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.map((li) => li._id));
    if (isCheckAll) {
        setIsCheck([]);
    }      
  };

  
  const {
    totalResults,
    resultsPerPage,
    handleChangePage,
} = useFilter(data);


  return (
    <>
      <PageTitle>{t("RoleAndPermissionPage")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <MainDrawer>
        <RoleAndPermissionDrawer id={serviceId} />
      </MainDrawer>
      {(can.add || can.delete) && (
        <AnimatedContent>
          <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
            <CardBody>
              <div className="w-full flex justify-end flex-grow-0">
              {can.delete && (
                  <div className="w-full md:w-32 lg:w-32 xl:w-32  mr-3 mb-3 lg:mb-0">
                    <Button
                      disabled={isCheck.length < 1}
                      onClick={() => handleDeleteMany(isCheck)}
                      className="w-full rounded-md h-12 btn-red"
                    >
                      <span className="mr-2">
                        <FiTrash2 />
                      </span>
                      {t("Delete")}
                    </Button>
                  </div>
                 )}
                {can.add && (
                  <div className="w-full md:w-48 lg:w-48 xl:w-48">
                    <Button
                      onClick={toggleDrawer}
                      className="w-full rounded-md h-12"
                    >
                      <span className="mr-2">
                        <FiPlus />
                      </span>
                      {t("AddRole")}
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </AnimatedContent>
      )}
      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : data?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    isChecked={isCheckAll}
                    handleClick={handleSelectAll}
                  />
                </TableCell>
                <TableCell>{t("Role")}</TableCell>
                <TableCell className="text-center">{t("Permissions")}</TableCell>
                <TableCell className="text-center">
                  {t("PublishedTbl")}
                </TableCell>
                <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
              </tr>
            </TableHeader>
            <RoleAndPermissionTable
              isCheck={isCheck}
              roles={data}
              setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Product" />
      )}
    </>
  );
};

export default RoleAndPermission;