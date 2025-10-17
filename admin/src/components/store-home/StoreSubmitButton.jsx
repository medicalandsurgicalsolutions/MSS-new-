import usePermission from '@/hooks/usePermission';
import { useTranslation } from 'react-i18next';
import { Button } from "@windmill/react-ui";
import spinnerLoadingImage from "@/assets/img/spinner.gif";

const StoreSubmitButton = ({ isSubmitting, isSave, onUpdate }) => {
  const { t } = useTranslation();

  // Get permissions from hook
  const { can } = usePermission("store_customize");

  // Safety: don't render until permissions are loaded
  if (!can) return null;

  // Handle button click
  const handleClick = () => {
    if (can.edit && onUpdate) {
      onUpdate(); // Call your update function
    }
  };

  return (
    <>
      {can.edit && (
        <div className="sticky top-0 z-20 flex justify-end">
          {isSubmitting ? (
            <Button disabled type="button" className="h-10 px-6 flex items-center">
              <img
                src={spinnerLoadingImage}
                alt="Loading"
                width={20}
                height={20}
              />
              <span className="font-serif ml-2 font-light">
                {t("Processing")}
              </span>
            </Button>
          ) : (
            <Button
              type="button"
              className="h-10 px-6"
              onClick={handleClick}
            >
              {isSave ? t("SaveBtn") : t("UpdateBtn")}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default StoreSubmitButton;
