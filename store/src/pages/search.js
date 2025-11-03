
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// internal imports
import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@components/preloader/Loading";
import AttributeServices from "@services/AttributeServices";
import Card from "@components/cta-card/Card";
import CategoryCarousel from "@components/carousel/CategoryCarousel";
import useUtilsFunction from "@hooks/useUtilsFunction";
import DepartmentServices from "@services/DepartmentServices";
import CategoryServices from "@services/CategoryServices";
import { useRouter } from "next/router";
import { IoFunnelSharp } from "react-icons/io5";
import { useParams } from "next/navigation";

const Search = ({
  products,
  attributes,
  brands,
  categories,
  departments,
  nextPage,
  prevPage,
  totalProduct,
}) => {
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [visibleProduct, setVisibleProduct] = useState(4000);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // console.log("Prodect kjhlj;lhjkghg ",filteredProducts);

  const router = useRouter();

  const { asPath, query: searchQuery } = router;
  const { query, category: queryCategory, brand: queryBrand, title, slug, _id } = searchQuery;
  // console.log(filteredProducts);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000);
  const [brand, setBrand] = useState([]);
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [category, setCategory] = useState([]);
  // console.log("Category Log Check ", category);

  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [department, setDepartment] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [isOpenDepartment, setIsOpenDepartment] = useState(false);
  const [apply, setApply] = useState(false);

  useEffect(() => {
    const savedScrollData = localStorage.getItem("mssscrollPosition");

    if (savedScrollData) {
      const { position, expiry } = JSON.parse(savedScrollData);

      // Check if the scroll data is still valid (within 5 minutes)
      if (new Date().getTime() < expiry) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(position, 10));
        }, 100); // Small delay to ensure DOM stability

        // Remove the scroll data after using it
        localStorage.removeItem("mssscrollPosition");
      } else {
        // If the data is expired, remove it
        localStorage.removeItem("mssscrollPosition");
      }
    }
  }, [products]); // Add 'products' dependency if needed

  const loadNextPage = async (page) => {
    const params = new URLSearchParams();
    // Add parameters if their values are available
    if (query) params.set("query", query);
    if (queryCategory) params.set("category", queryCategory);
    if (queryBrand) params.set("brand", queryBrand);
    if (title) params.set("title", title);
    if (slug) params.set("slug", slug);
    if (_id) params.set("_id", _id);
    if (page !== undefined) params.set("page", page); // Include page only if defined

    await router.push(`/search?${params.toString()}`);
    // await router.push(`/search?query=${query}&category=${queryCategory}&title=${title}&slug=${slug}&page=${page}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    reset();
  }, [asPath]);

  const [expandFilter, setExpandFilter] = useState("hidden lg:block");

  useEffect(() => {
    if (apply) {
      // setExpandFilter(expandFilter == "block" ? "hidden" : "block");
      let services = products;

      // Filter by price range if min and max are specified
      if (min > 0 && max <= 100000) {
        services = services?.filter(
          (service) =>
            service.prices.price >= min && service.prices.price <= max
        );
      }

      // Filter by brand if any brands are selected
      if (brand.length > 0) {
        services = services?.filter((service) =>
          brand.includes(service.brand?._id)
        );
      }

      // Filter by department if specified
      // if (department.length > 0) {
      //   services = services?.filter(service =>
      //     department.includes(service.category?.departmentId)
      //   );
      // }

      // Filter by category if specified
      // console.log("Services Check", services);

      if (category.length > 0) {
        services = services?.filter((service) => {
          const isCategoryMatched = service?.category
            ? category?.includes(service?.category?._id)
            : false;

          const isCategoriesMatched = service?.categories?.some((catId) =>
            category?.includes(catId?._id)
          );

          // console.log(`Service ID: ${service.category._id},isCategoryMatched: ${isCategoryMatched}, isCategoriesMatched: ${isCategoriesMatched}`);

          return isCategoryMatched || isCategoriesMatched;
        });
      }

      if (attribute.length > 0) {
        services = services?.filter((service) => {
          const variantAttributes = service.variants.flatMap((variant) =>
            Object.entries(variant).filter(
              ([key, value]) =>
                key !== "originalPrice" &&
                key !== "price" &&
                key !== "quantity" &&
                key !== "discount" &&
                key !== "productId" &&
                key !== "barcode" &&
                key !== "sku" &&
                key !== "image"
            )
          );
          // console.log(variantAttributes);

          // Check if every selected attribute can match any pair of the variant attributes
          return attribute.every((a) => {
            const { attributeId, variantId } = a;
            return variantAttributes.some(
              ([key, value]) => key === attributeId && value === variantId
            );
          });
        });
      }

      // console.log(services);

      setFilteredProducts(services);
      setApply(false);
    }
  }, [apply]);

  const reset = () => {
    setApply(false);
    setMin(0);
    setMax(100000);
    setBrand([]);
    setIsOpenBrand(false);
    setCategory([]);
    setIsOpenCategory(false);
    setDepartment([]);
    setIsOpenDepartment(false);
    setAttribute([]);
    setFilteredProducts(products);
  };

  const handleBrandChange = (brandId) => {
    setBrand((prevSelected) => {
      if (prevSelected.includes(brandId)) {
        return prevSelected.filter((id) => id !== brandId);
      } else {
        return [...prevSelected, brandId];
      }
    });
  };

  const handleCategoryChange = (categoryId) => {
    setCategory((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const handleDepartmentChange = (departmentId) => {
    setDepartment((prevSelected) => {
      if (prevSelected.includes(departmentId)) {
        return prevSelected.filter((id) => id !== departmentId);
      } else {
        return [...prevSelected, departmentId];
      }
    });
  };

  const handleAttributeChange = (body) => {
    const { attributeId, variantId } = body;
    const exists = attribute.some(
      (attr) => attr.attributeId === attributeId && attr.variantId === variantId
    );

    if (exists) {
      setAttribute((prevState) =>
        prevState.filter(
          (attr) =>
            !(attr.attributeId === attributeId && attr.variantId === variantId)
        )
      );
    } else {
      setAttribute((prevState) => [...prevState, { attributeId, variantId }]);
    }
  };

  const brandRef = useRef(null); // Create a ref to attach to the dropdown
  const categoryRef = useRef(null); // Create a ref to attach to the dropdown
  const departmentRef = useRef(null); // Create a ref to attach to the dropdown

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setIsOpenBrand(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsOpenCategory(false);
      }
      if (
        departmentRef.current &&
        !departmentRef.current.contains(event.target)
      ) {
        setIsOpenDepartment(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [brandRef, categoryRef, departmentRef]);

  const { setSortedField, productData } = useFilter(filteredProducts);

  const showProduct = productData.filter(
    (product) => product?.status === "show"
  );

  // console.log("productData ", productData);
  // console.log("showProduct ", showProduct);

  return isLoading ? (
    <Loading loading={isLoading} />
  ) : (
    <Layout title="Search" description="This is search page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        {/* <div className="w-full mt-4">
          <div className="w-full grid grid-col gap-4 grid-cols-1 2xl:gap-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
              <Card />
            </div>
            <div className="relative">
              <CategoryCarousel />
            </div>
        </div> */}
        <div className="flex py-10 lg:py-12">
          <div className="w-full lg:flex">
            <div
              className="flex justify-between mb-3 bg-white shadow-sm rounded p-3 lg:hidden"
              onClick={() =>
                setExpandFilter(expandFilter == "block" ? "hidden" : "block")
              }
            >
              <h6 className="text-sm ">{t("common:filters")}</h6>
              <span className="text-sm ">
                <IoFunnelSharp />
              </span>
            </div>
            {/* Filters Section */}
            <div
              className={`lg:w-1/4 p-6 rounded-lg bg-white shadow-md mb-6 lg:mb-0 lg:mr-6 ${expandFilter}`}
            >
              {/* Filter Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {t("common:filters")}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={reset}
                    className="px-4 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  >
                    {t("common:reset")}
                  </button>
                  <button
                    onClick={() => setApply(true)}
                    className="px-4 py-1 rounded-md text-sm font-medium bg-cyan-500 text-white hover:cyan-600 transition"
                  >
                    {t("common:apply")}
                  </button>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {t("common:filterByPrice")}
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600">
                    ₹{min}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={min}
                    onChange={(e) => setMin(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    ₹{max}
                  </span>
                </div>
              </div>

              {/* Filter by Category */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {t("common:filterByCategory")}
                </h3>
                <div className="relative" ref={categoryRef}>
                  <button
                    type="button"
                    onClick={() => setIsOpenCategory(!isOpenCategory)}
                    className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {category.length > 0
                      ? `${category.length} ${t("common:selected")}`
                      : t("common:selectCategory")}
                  </button>
                  {isOpenCategory && (
                    <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md p-4 max-h-48 overflow-y-auto">
                      {categories[0]?.children?.map((c) => (
                        <label
                          key={c?._id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={c?._id}
                            checked={category.includes(c?._id)}
                            onChange={() => handleCategoryChange(c?._id)}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">
                            {showingTranslateValue(c?.name)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Filter by Brand */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {t("common:filterByBrand")}
                </h3>
                <div className="relative" ref={brandRef}>
                  <button
                    type="button"
                    onClick={() => setIsOpenBrand(!isOpenBrand)}
                    className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {brand.length > 0
                      ? `${brand.length} ${t("common:selected")}`
                      : t("common:selectBrand")}
                  </button>
                  {isOpenBrand && (
                    <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md p-4 max-h-48 overflow-y-auto">
                      {brands.map((b) => (
                        <label
                          key={b._id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={b._id}
                            checked={brand.includes(b._id)}
                            onChange={() => handleBrandChange(b._id)}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">
                            {showingTranslateValue(b?.name)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Filter by Attributes */}
              {/* {attributes.map((a, j) => (
                <div key={j} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{showingTranslateValue(a?.name)}</h3>
                  <div className="flex flex-wrap gap-2">
                    {a.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => handleAttributeChange({ attributeId: a._id, variantId: v._id })}
                        className={`px-3 py-1 text-xs rounded-full ${
                          attribute.some((attr) => attr.attributeId === a._id && attr.variantId === v._id)
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {showingTranslateValue(v?.name)}
                      </button>
                    ))}
                  </div>
                </div>
              ))} */}
            </div>
            {/* Products Section */}
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between mb-3 bg-white shadow-sm rounded p-3">
                <h6 className="text-sm ">
                  {t("common:totalI")}{" "}
                  <span className="font-bold">{totalProduct}</span>{" "}
                  {t("common:itemsFound")}
                </h6>
                <span className="text-sm ">
                  <select
                    onChange={(e) => setSortedField(e.target.value)}
                    className="py-0 text-sm  font-medium block w-full rounded border-0 bg-emerald-50 pr-10 cursor-pointer focus:ring-0"
                  >
                    <option className="px-3" value="All" defaultValue hidden>
                      {t("common:sortByPrice")}
                    </option>
                    <option className="px-3" value="Low">
                      {t("common:lowToHigh")}
                    </option>
                    <option className="px-3" value="High">
                      {t("common:highToLow")}
                    </option>
                  </select>
                </span>
              </div>
              {showProduct?.length === 0 && (
                <div className="mx-auto p-5 my-5">
                  <Image
                    className="my-4 mx-auto"
                    src="/no-result.svg"
                    alt="no-result"
                    width={400}
                    height={380}
                  />
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium  text-gray-600">
                    {t("common:sorryText")} 😞
                  </h2>
                </div>
              )}

              {isLoading ? (
                <Loading loading={isLoading} />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {showProduct?.slice(0, visibleProduct).map((product, i) => (
                      <ProductCard
                        key={i + 1}
                        product={product}
                        attributes={attributes}
                      />
                    ))}
                  </div>

                  <div className="flex">
                    {prevPage > 0 && (
                      <button
                        onClick={() => loadNextPage(prevPage)}
                        className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-600 h-12 mt-6 text-sm lg:text-sm"
                      >
                        {"Prev"}
                      </button>
                    )}
                    {nextPage > 1 && showProduct.length == 20 && (
                      <button
                        onClick={() => loadNextPage(nextPage)}
                        className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-600 h-12 mt-6 text-sm lg:text-sm"
                      >
                        {"Next"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const { query, title, _id, page, brand } = context.query;
  console.log(query);
  const [data, attributes, brands, categories, departments] = await Promise.all(
    [
      ProductServices.getShowingStoreProducts({
        category: _id ? _id : "",
        brand: brand ? encodeURIComponent(brand) : "",
        title: title ? encodeURIComponent(title) : "",
        query: query ? encodeURIComponent(query) : "",
        page: page ? encodeURIComponent(page) : 1,
      }),
      AttributeServices.getShowingAttributes({}),
      ProductServices.getShowingsBrands(),
      CategoryServices.getShowingCategory(),
      DepartmentServices.getShowingDepartments(),
    ]
  );

  return {
    props: {
      products: data?.products,
      nextPage: data?.nextPage ?? 1,
      prevPage: data?.prevPage ?? 0,
      totalProduct: data?.totalProduct ?? 0,
      attributes,
      brands,
      categories,
      departments,
    },
  };
};

// export const getServerSideProps = async (context) => {
//   const { query } = context.query;
//   const { Category } = context.query;
//   const { category } = context.query;
//   const data = await ProductServices.getShowingProducts();

//   let products = [];
//   //service filter with parent category
//   if (Category) {
//     products = data.filter(
//       (product) => product.parent.toLowerCase().replace("&", "").split(" ").join("-") === Category
//     );
//   }
//   //service filter with child category
//   if (category) {
//     products = data.filter(
//       (product) => product.children.toLowerCase().replace("&", "").split(" ").join("-") === category
//     );
//   }

//   //search result
//   if (query) {
//     products = data.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
//   }

//   return {
//     props: {
//       products,
//     },
//   };
// };
