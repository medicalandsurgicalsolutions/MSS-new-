import {
    Button,
    Card,
    CardBody,
    Input,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus, FiTrash2 } from "react-icons/fi";

//internal import

import useAsync from "@/hooks/useAsync";
import { SidebarContext } from "@/context/SidebarContext";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useFilter from "@/hooks/useFilter";
import DeleteModal from "@/components/modal/DeleteModal";
import PageTitle from "@/components/Typography/PageTitle";
import MainDrawer from "@/components/drawer/MainDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import CheckBox from "@/components/form/others/CheckBox";
import NotFound from "@/components/table/NotFound";
import AnimatedContent from "@/components/common/AnimatedContent";
import DepartmentTable from "@/components/department/DepartmentTable";
import usePermission from "@/hooks/usePermission";
import BrandServices from "@/services/BrandServices";
import BrandTable from "@/components/brand/BrandTable";
import ClientTable from "@/components/client/ClientTable";
import ClientServices from "@/services/ClientServices";
import PartnerDrawer from "@/components/drawer/PartnerDrawer";
import PartnerTable from "@/components/partner/PartnerTable";
import PartnerServices from "@/services/PartnerServices";

const Partner = () => {

    const { toggleDrawer } = useContext(SidebarContext);

    const { data, loading, error } = useAsync(PartnerServices.getAllPartners);

    // console.log("Get Data Client All ", data);
    
    const { handleDeleteMany, allId, serviceId } = useToggleDrawer();

    const { t } = useTranslation();

    const { can } = usePermission("brand");

    const {
        handleSubmitBrand,
        brandRef,
        totalResults,
        resultsPerPage,
        dataTable,
        serviceData,
        handleChangePage,
        setBrandType,
    } = useFilter(data);

    
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(data.map((li) => li._id));
        if (isCheckAll) {
            setIsCheck([]);
        }        
    };

    // handle reset field function
    const handleResetField = () => {
        setBrandType("");
        brandRef.current.value = "";
    };


    return (
        <>
            <PageTitle>{t("Our Partner")}</PageTitle>
            <DeleteModal ids={allId} setIsCheck={setIsCheck} />

            <MainDrawer>
                <PartnerDrawer id={serviceId} />
            </MainDrawer>

            <AnimatedContent>
                {(can.delete || can.add) && (
                    <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                        <CardBody className="">
                            <div className="w-full flex justify-end flex-grow-0">
                                {can.delete && (
                                    <div className="w-full md:w-32 lg:w-32 xl:w-32  mr-3 lg:mb-0">
                                        <Button
                                            disabled={isCheck.length < 1}
                                            onClick={() => handleDeleteMany(isCheck)}
                                            className="w-full rounded-md h-12 bg-red-500 disabled  btn-red"
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
                                            className="rounded-md h-12 w-full"
                                        >
                                            <span className="mr-2">
                                                <FiPlus />
                                            </span>
                                            {"Add Partner"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                )}
                <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
                    <CardBody>
                        <form
                            onSubmit={handleSubmitBrand}
                            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
                        >
                            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <Input
                                    ref={brandRef}
                                    type="search"
                                    placeholder={t("Search by client name")}
                                />
                            </div>
                            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <div className="w-full mx-1">
                                    <Button type="submit" className="h-12 w-full bg-emerald-700">
                                        Filter
                                    </Button>
                                </div>

                                <div className="w-full mx-1">
                                    <Button
                                        layout="outline"
                                        onClick={handleResetField}
                                        type="reset"
                                        className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                                    >
                                        <span className="text-black dark:text-gray-200">Reset</span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </AnimatedContent>


            {loading ? (
                <TableLoading row={12} col={6} width={190} height={20} />
            ) : error ? (
                <span className="text-center mx-auto text-red-500">{error}</span>
            ) : serviceData?.length !== 0 ? (
                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>
                                    <CheckBox
                                        type="checkbox"
                                        name="selectAll"
                                        id="selectAll"
                                        handleClick={handleSelectAll}
                                        isChecked={isCheckAll}
                                    />
                                </TableCell>

                                <TableCell>{t("DepIdTbl")}</TableCell>
                                <TableCell>{t("DepTbName")}</TableCell>
                                <TableCell>{"Image"}</TableCell>
                                <TableCell>{t("Website")}</TableCell>
                                {/* <TableCell className="text-center">{t("DepPublishedTbl")} </TableCell> */}
                                <TableCell className="text-right">{t("DepActionsTbl")}</TableCell>
                            </tr>
                        </TableHeader>

                        <PartnerTable
                            data={data}
                            isCheck={isCheck}
                            partners={dataTable}
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
                <NotFound title="Sorry, There are no categories right now." />
            )}
        </>
    )
}

export default Partner;