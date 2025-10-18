// src/pages/store-home/StoreSubmitButton.jsx
import { useTranslation } from "react-i18next";
import { Button } from "@windmill/react-ui";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import usePermission from "@/hooks/usePermission";

const StoreSubmitButton = ({ isSubmitting, isSave }) => {
  const { t } = useTranslation();
  const { can } = usePermission("store_customize");

  console.log("StoreSubmitButton permissions:", can);

  return (
    <>
      {can.edit && (
        <div className="sticky top-0 z-20 flex justify-end">
          {isSubmitting ? (
            <Button disabled type="button" className="h-10 px-6">
              <img
                src={spinnerLoadingImage}
                alt="Loading"
                width={20}
                height={10}
              />
              <span className="font-serif ml-2 font-light">
                {t("Processing")}
              </span>
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-10 px-6"
              onClick={() => console.log("Submit button clicked")}
            >
              {isSave ? t("UpdateBtn") : t("SaveBtn")}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default StoreSubmitButton;
