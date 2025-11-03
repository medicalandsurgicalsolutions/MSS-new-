import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@components/preloader/Loading";
import AttributeServices from "@services/AttributeServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import DepartmentServices from "@services/DepartmentServices";
import CategoryServices from "@services/CategoryServices";
import { useRouter } from "next/router";
import { IoFunnelSharp } from "react-icons/io5";

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
  const router = useRouter();
  const { asPath, query: searchQuery } = router;
  const { query, category: queryCategory, brand: queryBrand, title, slug, _id } = searchQuery;

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000);
  const [brand, setBrand] = useState([]);
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [category, setCategory] = useState([]);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [attribute, setAttribute] = useState([]);
  const [apply, setApply] = useState(false);
  const [expandFilter, setExpandFilter] = useState(false);

  const brandRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    setFilteredProducts(products);
    setIsLoading(false);
  }, [products]);

  useEffect(() => {
    if (apply) {
      let services = products;

      if (min > 0 && max <= 100000) {
        services = services.filter(
          (s) => s.prices.price >= min && s.prices.price <= max
        );
      }

      if (brand.length > 0) {
        services = services.filter((s) => brand.includes(s.brand?._id));
      }

      if (category.length > 0) {
        services = services.filter((s) => {
          const mainCat = s?.category ? category.includes(s.category._id) : false;
          const subCats = s?.categories?.some((catId) => category.includes(catId?._id));
          return mainCat || subCats;
        });
      }

      setFilteredProducts(services);
      setApply(false);
    }
  }, [apply]);

  const reset = () => {
    setMin(0);
    setMax(100000);
    setBrand([]);
    setCategory([]);
    setFilteredProducts(products);
  };

  const handleBrandChange = (id) =>
    setBrand((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );

  const handleCategoryChange = (id) =>
    setCategory((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const loadNextPage = async (page) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (queryCategory) params.set("category", queryCategory);
    if (queryBrand) params.set("brand", queryBrand);
    if (title) params.set("title", title);
    if (slug) params.set("slug", slug);
    if (_id) params.set("_id", _id);
    if (page !== undefined) params.set("page", page);
    await router.push(`/search?${params.toString()}`);
  };

  const { setSortedField, productData } = useFilter(filteredProducts);
  const showProduct = productData.filter((p) => p?.status === "show");

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <Layout title="Search" description="This is search page">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setExpandFilter(!expandFilter)}
            className="flex justify-between items-center w-full bg-white shadow-md p-3 rounded-md"
          >
            <span className="font-medium text-gray-800">{t("common:filters")}</span>
            <IoFunnelSharp className="text-xl" />
          </button>

          {expandFilter && (
            <div className="mt-3 bg-white p-4 rounded-lg shadow-md">
              <Filters
                t={t}
                min={min}
                max={max}
                setMin={setMin}
                setMax={setMax}
                brand={brand}
                brands={brands}
                handleBrandChange={handleBrandChange}
                category={category}
                categories={categories}
                handleCategoryChange={handleCategoryChange}
                reset={reset}
                setApply={setApply}
                showingTranslateValue={showingTranslateValue}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Filters
                t={t}
                min={min}
                max={max}
                setMin={setMin}
                setMax={setMax}
                brand={brand}
                brands={brands}
                handleBrandChange={handleBrandChange}
                category={category}
                categories={categories}
                handleCategoryChange={handleCategoryChange}
                reset={reset}
                setApply={setApply}
                showingTranslateValue={showingTranslateValue}
              />
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white shadow-sm rounded p-3 mb-4">
              <h6 className="text-sm text-gray-700">
                {t("common:totalI")}{" "}
                <span className="font-bold">{totalProduct}</span>{" "}
                {t("common:itemsFound")}
              </h6>
              <select
                onChange={(e) => setSortedField(e.target.value)}
                className="py-1 text-sm border border-gray-300 rounded-md bg-emerald-50 cursor-pointer focus:ring-0"
              >
                <option value="All" hidden>
                  {t("common:sortByPrice")}
                </option>
                <option value="Low">{t("common:lowToHigh")}</option>
                <option value="High">{t("common:highToLow")}</option>
              </select>
            </div>

            {showProduct?.length === 0 ? (
              <div className="flex flex-col items-center py-10">
                <Image src="/no-result.svg" alt="no-result" width={250} height={220} />
                <h2 className="text-lg text-center mt-4 text-gray-600 font-medium">
                  {t("common:sorryText")} 😞
                </h2>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {showProduct
                    ?.slice(0, visibleProduct)
                    .map((product, i) => (
                      <ProductCard key={i} product={product} attributes={attributes} />
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  {prevPage > 0 && (
                    <button
                      onClick={() => loadNextPage(prevPage)}
                      className="px-6 py-2 bg-gray-100 hover:bg-cyan-600 hover:text-white rounded-md text-sm transition"
                    >
                      Prev
                    </button>
                  )}
                  {nextPage > 1 && showProduct.length == 20 && (
                    <button
                      onClick={() => loadNextPage(nextPage)}
                      className="px-6 py-2 bg-gray-100 hover:bg-cyan-600 hover:text-white rounded-md text-sm transition"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Reusable filter component for both mobile and desktop
const Filters = ({
  t,
  min,
  max,
  setMin,
  setMax,
  brand,
  brands,
  handleBrandChange,
  category,
  categories,
  handleCategoryChange,
  reset,
  setApply,
  showingTranslateValue,
}) => (
  <>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-gray-800">{t("common:filters")}</h2>
      <div className="flex gap-2">
        <button
          onClick={reset}
          className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {t("common:reset")}
        </button>
        <button
          onClick={() => setApply(true)}
          className="px-3 py-1 rounded-md text-sm font-medium bg-cyan-500 text-white hover:bg-cyan-600"
        >
          {t("common:apply")}
        </button>
      </div>
    </div>

    {/* Price Range */}
    <div className="mb-6">
      <h3 className="text-base font-semibold text-gray-700 mb-3">
        {t("common:filterByPrice")}
      </h3>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600">₹{min}</span>
        <input
          type="range"
          min="0"
          max="100000"
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
        <span className="text-sm font-medium text-gray-600">₹{max}</span>
      </div>
    </div>

    {/* Category Filter */}
    <div className="mb-6">
      <h3 className="text-base font-semibold text-gray-700 mb-3">
        {t("common:filterByCategory")}
      </h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {categories[0]?.children?.map((c) => (
          <label key={c?._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={c?._id}
              checked={category.includes(c?._id)}
              onChange={() => handleCategoryChange(c?._id)}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-gray-700 text-sm">
              {showingTranslateValue(c?.name)}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Brand Filter */}
    <div className="mb-6">
      <h3 className="text-base font-semibold text-gray-700 mb-3">
        {t("common:filterByBrand")}
      </h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {brands.map((b) => (
          <label key={b._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={b._id}
              checked={brand.includes(b._id)}
              onChange={() => handleBrandChange(b._id)}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-gray-700 text-sm">
              {showingTranslateValue(b?.name)}
            </span>
          </label>
        ))}
      </div>
    </div>
  </>
);

export default Search;

export const getServerSideProps = async (context) => {
  const { query, title, _id, page, brand } = context.query;

  const [data, attributes, brands, categories, departments] = await Promise.all([
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
  ]);

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
