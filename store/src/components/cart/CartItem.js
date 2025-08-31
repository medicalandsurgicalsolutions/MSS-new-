import { useContext } from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

//internal import
import useAddToCart from "@hooks/useAddToCart";
import { SidebarContext } from "@context/SidebarContext";
import DUMMY_IMAGE from "@components/constants";
import useGetSetting from "@hooks/useGetSetting";

const CartItem = ({ item, currency }) => {
  const { updateItemQuantity, removeItem } = useCart();
  const { closeCartDrawer } = useContext(SidebarContext);
  const { handleIncreaseQuantity } = useAddToCart();

  // console.log("item>>", item);
  const { globalSetting } = useGetSetting();

  return (
    <div className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0">
      <div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4">
        <img
          key={item.id}
          src={Array.isArray(item?.image) ? item?.image[0] : item?.image || DUMMY_IMAGE}
          width={40}
          height={40}
          alt={item.title}
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex gap-4 justify-between">
          <Link
            href={`/product/${item.slug}`}
            onClick={closeCartDrawer}
            className="truncate text-sm font-medium text-gray-700 text-heading line-clamp-1 text-wrap"
          >
            {item.title}
          </Link>
          {/* <span className={`${item.isCodAvaialble ? "bg-green-600" : "bg-emerald-600"} text-white px-2 rounded-full text-sm`}>
            COD
          </span> */}
        </div>
        <span className="text-xs text-gray-400 mb-1">
          Item Price {globalSetting?.default_currency || "$"}{item.price}
        </span>
        <div className="flex items-center justify-between">
          <div className="font-bold text-sm md:text-base text-heading leading-5">
            <span>
              {currency}
              {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
          <div className="h-8 w-22 md:w-24 lg:w-24 flex flex-wrap items-center justify-evenly p-1 border border-gray-100 bg-white text-gray-600 rounded-md">
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              <span className="text-dark text-base">
                <FiMinus />
              </span>
            </button>
            <p className="text-sm font-semibold text-dark px-1">
              {item.quantity}
            </p>
            <button onClick={() => handleIncreaseQuantity(item)}>
              <span className="text-dark text-base">
                <FiPlus />
              </span>
            </button>
          </div>
          <div className="flex gap-4">
            {/* <span className={item.isCodAvaialble ? "bg-green-500" : "bg-emerald-500" + "mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs  mt-2 focus:outline-none"}>
              COD
            </span> */}
            <button
              onClick={() => removeItem(item.id)}
              className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
