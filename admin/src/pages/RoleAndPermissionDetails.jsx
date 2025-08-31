import {
  Button,
  Card,
  CardBody
} from "@windmill/react-ui";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
//internal import

import useAsync from "@/hooks/useAsync";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import Loading from "@/components/preloader/Loading";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import CheckBoxLabel from "@/components/form/input/CheckBoxLabel";
import RoleAndPermissionServices from "@/services/RoleAndPermissionServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import usePermission from "@/hooks/usePermission";

const RoleAndPermissionDetails = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const { lang } = useContext(SidebarContext);

  const { data, loading: l } = useAsync(() => RoleAndPermissionServices.getRoleById(id));

  const { data: permissions, loading } = useAsync(() => RoleAndPermissionServices.getAllPermissions());

  const { showingTranslateValue } = useUtilsFunction();

  const [submitting, setSubmitting] = useState(false)


  const [allowedPermissions, setAllowedPermissions] = useState(data?.permissions || []);

  const handleSelect = (allIds = []) => {
    setAllowedPermissions((prevPermissions) => {
      if (allIds.length > 0) {
        const allIdsIncluded = allIds.every(id => prevPermissions.includes(id));
  
        if (allIdsIncluded) {
          return prevPermissions.filter(permissionId => !allIds.includes(permissionId));
        } else {
          return [...new Set([...prevPermissions, ...allIds])]; // Add while avoiding duplicates
        }
      }
      return prevPermissions;
    });
  };

  const { can } = usePermission("permission");

  useEffect(() => {
    setAllowedPermissions(data?.permissions || []);
  }, [data])

  const groupPermissionsByTitle = (permissions) => {
    return permissions.reduce((acc, permission) => {
      const title = permission.title[lang] || permission.title["en"]; // Use lang or fallback to 'en'

      const existingGroup = acc.find(group => group.title[lang] === title);

      if (existingGroup) {
        existingGroup.permissions.push(permission);
      } else {
        acc.push({
          title: { [lang]: title },
          permissions: [permission]
        });
      }

      return acc;
    }, []);
  };

  const groupedPermissions = groupPermissionsByTitle(permissions || []);

  const findGroupWithMaxPermissions = (groupedPermissions) => {
    return groupedPermissions.reduce((maxGroup, currentGroup) => {
      return (currentGroup.permissions.length > maxGroup.permissions.length) ? currentGroup : maxGroup;
    }, { permissions: [] }); // Start with an empty group for comparison
  };
  
  const maxGroup = findGroupWithMaxPermissions(groupedPermissions);

  const onSubmit = async () => {
    try {
      setSubmitting(true);

      const roleData = {
        permissions: allowedPermissions
      };

      const res = await RoleAndPermissionServices.updateRolePermissions(id, roleData);
      const newRes = await RoleAndPermissionServices.getRoleById(id);
      setAllowedPermissions(newRes?.permissions || []);
      setSubmitting(false);
      notifySuccess(res.message);

    } catch (err) {
      setSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };


  return (
    <>
      <div>
        <PageTitle>{t("Role") + " | " + showingTranslateValue(data?.name)}</PageTitle>
      </div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            {can.edit && (
              <div className="flex justify-end">
                {submitting ? (
                  <Button disabled={true} type="button" className="h-10 px-6">
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">
                      {" "}
                      {t("Processing")}
                    </span>
                  </Button>
                ) : (
                  <button
                    type="button"
                    className="h-10 px-6 text-white bg-emerald-500 border border-transparent hover:bg-emerald-600 rounded-md"
                    onClick={onSubmit}
                  >
                    {t("UpdateBtn")}
                  </button>
                )}
              </div>
            )}
            <div className="p-4 w-full">
              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-6">
                {maxGroup.permissions.map(p => (
                  <div key={p?._id}>
                    <CheckBoxLabel
                      name="name"
                      label={"Allow all " + showingTranslateValue(p?.name)}
                      isChecked={
                        permissions.filter(obj => showingTranslateValue(p?.name) === showingTranslateValue(obj?.name))
                        .every(obj => allowedPermissions?.includes(obj._id))
                      }
                      handleClick={e => {
                        const allIds = permissions.filter(obj => showingTranslateValue(p?.name) == showingTranslateValue(obj?.name))
                          .map(obj => obj._id);
                        // console.log(allIds);
                        
                        handleSelect(allIds);
                      }}
                    />
                  </div>
                ))}
              </div>
              {groupedPermissions.map((permission, index) => (
                <div className="mb-8" key={index}>
                  <h1 className="text-xl font-bold mb-2 dark:text-gray-300">{showingTranslateValue(permission?.title)}</h1>
                  <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {permission.permissions.map(p => (
                      <div key={p?._id}>
                        <CheckBoxLabel
                          name="name"
                          label={showingTranslateValue(p?.name)}
                          isChecked={allowedPermissions?.includes(p?._id)}
                          handleClick={e => handleSelect([p?._id])}
                        />
                      </div>
                    ))}
                    <CheckBoxLabel
                      name="name"
                      label={"Allow all"}
                      isChecked={permission.permissions.every(obj => allowedPermissions?.includes(obj._id))}
                      handleClick={e => {
                        const allIds = permission.permissions.map(obj => obj._id);
                        handleSelect(allIds);  // Pass only allIds
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
};



export default RoleAndPermissionDetails