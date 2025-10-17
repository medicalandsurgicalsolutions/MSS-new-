import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import usePermission from "@/hooks/usePermission";
import spinnerLoadingImage from "@/assets/img/spinner.gif";

const StoreSubmitButton = ({ formData }) => {
  const { t } = useTranslation();
  const { can } = usePermission("store_customize");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("StoreSubmitButton rendered, permission:", can);

  const handleUpdate = async () => {
    console.log("Update button clicked");
    if (!can) {
      console.log("No permission to update");
      alert("You don't have permission to update");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Submitting formData:", formData);

      // simulate update
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Update success");
      alert("Update successful!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={() => {
        console.log("Button clicked directly");
        handleUpdate();
      }}
      disabled={isSubmitting || !can}
    >
      {isSubmitting ? (
        <img src={spinnerLoadingImage} alt="loading" className="h-5 w-5" />
      ) : (
        t("Update")
      )}
    </Button>
  );
};

export default StoreSubmitButton;
