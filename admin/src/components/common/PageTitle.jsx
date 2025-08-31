import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, description }) => {
  return (
    <Helmet>
      <title>
        {" "}
        {title
          ? `${title} | India's No.1 Online Store For Hospital Supplies | MSS`
          : "Medical Supplies Online | India's No.1 Online Store For Hospital Supplies | MSS"}
      </title>
      <meta
        name="description"
        content={
          description
            ? ` ${description} `
            : "India's No.1 Online B2B Platform Only for Doctors and Hospitals | Best Warranty and After Sales Service | Easy Return Policy | 30000+ Happy Doctors."
        }
      />
    </Helmet>
  );
};

export default PageTitle;
