import usePermission from "@/hooks/usePermission";
import { useTranslation } from "react-i18next";
import { Button } from "@windmill/react-ui";
import spinnerLoadingImage from "@/assets/img/spinner.gif";

const StoreSubmitButton = ({ isSubmitting, isSave }) => {
  console.log("StoreSubmitButton mounted ✅");

  const { t } = useTranslation();
  const { can } = usePermission("store_customize");

  console.log("Permission object:", can);

  return (
    <>
      {can?.edit ? (
        <div className="sticky top-0 z-20 flex justify-end bg-white dark:bg-gray-800 p-2">
          {isSubmitting ? (
            <Button disabled type="button" className="h-10 px-6">
              <img
                src={spinnerLoadingImage}
                alt="Loading"
                width={20}
                height={10}
              />{" "}
              <span className="font-serif ml-2 font-light">
                {t("Processing")}
              </span>
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-10 px-6"
              onClick={() => console.log("🟢 Update/Save button clicked")}
            >
              {isSave ? t("SaveBtn") : t("UpdateBtn")}
            </Button>
          )}
        </div>
      ) : (
        <div className="text-red-500 text-right p-2">
          ⚠️ No edit permission for "store_customize"
        </div>
      )}
    </>
  );
};

export default StoreSubmitButton;
