import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import usePermission from '@/hooks/usePermission';
import axios from "axios"; // if using axios for API

const StoreSubmitButton = ({ formData }) => {
  const { t } = useTranslation();
  const { can } = usePermission("store_customize"); // check permission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async () => {
    console.log("Update button clicked"); // Debug: click triggers
    if (!can) {
      console.log("User does not have permission to update");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Submitting data:", formData);

      // Example API call
      const response = await axios.post("/api/update", formData);
      console.log("Update response:", response.data);

      alert("Update successful!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed! Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      type="button" // prevent form refresh
      onClick={handleUpdate}
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
