"use client";
import { useEffect, useRef, useState } from "react";

const WatermarkedImage = ({ productImage, watermarkImage }) => {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const addWatermark = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const productImg = new Image();
      const watermarkImg = new Image();

      productImg.crossOrigin = "anonymous";
      watermarkImg.crossOrigin = "anonymous";

      productImg.src = productImage;
      watermarkImg.src = watermarkImage;

      productImg.onload = () => {
        canvas.width = productImg.width;
        canvas.height = productImg.height;

        // Draw product image
        ctx.drawImage(productImg, 0, 0);

        watermarkImg.onload = () => {
          const watermarkWidth = productImg.width * 0.3; // Adjust size (30% of the product image width)
          const watermarkHeight =
            watermarkImg.height * (watermarkWidth / watermarkImg.width);

          const x = (productImg.width - watermarkWidth) / 2;
          const y = (productImg.height - watermarkHeight) / 2;

          ctx.globalAlpha = 0.5; // Make watermark semi-transparent
          ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);

          // Generate image URL
          setImageSrc(canvas.toDataURL("image/png"));
        };
      };
    };

    addWatermark();
  }, [productImage, watermarkImage]);

  return (
    <div>
      {imageSrc && <img src={imageSrc} alt="Watermarked Product" />}
      <br />
      {imageSrc && (
        <a href={imageSrc} download="watermarked-product.png">
          Download Image
        </a>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default WatermarkedImage;
