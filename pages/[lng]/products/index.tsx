/* library package */
import { FC, useState, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router, { useRouter } from 'next/router'
import {
  ProductFilter,
  ProductSort,
  Products,
  useI18n,
  ProductCategory,
} from '@sirclo/nexus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSlidersH,
  faBoxOpen,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'

/* library template */
import useQuery from 'lib/utils/useQuery'
import { useBrand } from 'lib/utils/useBrand'
import useWindowSize from 'lib/utils/useWindowSize'
import useInfiniteScroll from 'lib/utils/useInfiniteScroll'
import convertToTextFromQuery from 'lib/utils/convertToTextFromQuery'

/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import SideMenu from 'components/SideMenu/SideMenu'
import Placeholder from 'components/Placeholder'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
const Quickview = dynamic(() => import('components/Quickview/Quickview'));
const Popup = dynamic(() => import('components/Popup/Popup'));

const classesProductFilter = {
  filterClassName: "products_filter",
  filterNameClassName: "products_filterName",
  filterOptionPriceClassName: "products_filterPrice",
  filterPriceLabelClassName: "products_filterPriceLabel",
  filterOptionClassName: "products_filterOption",
  filterLabelClassName: "products_filterOptionLabel",
  filterSliderClassName: "products_filterSlider",
  filterSliderRailClassName: "products_filterSliderRail",
  filterSliderHandleClassName: "products_filterSliderHandle",
  filterSliderTrackClassName: "products_filterSliderTrack",
  filterSliderTooltipClassName: "products_filterSliderTooltip",
  filterSliderTooltipContainerClassName:
    "products_filterSliderTooltipContainer",
  filterSliderTooltipTextClassName: "products_filterSliderTooltipText",
};

const classesProductSort = {
  sortClassName: "products-sort",
  sortOptionsClassName: "products-sort__list",
  sortOptionClassName: "products-sort__list--items",
  sortOptionButtonClassName: "products-sort__list--items-button",
};

const classesPagination = {
  pagingClassName: "col-12 blogs-page__pagination",
  itemClassName: "blogs-page__paginationItem",
  activeClassName: "blogs-page__paginationItemActive",
};

const classesProducts = {
  productContainerClassName: "col-6 col-md-4 products__item",
  productImageClassName: "products__item--image",
  priceClassName: "products__item--content-price--normal",
  productImageContainerClassName: "image-container",
  productLabelContainerClassName: "products__item--content",
  productTitleClassName: "products__item--content-title",
  productPriceClassName: "products__item--content-price",
  stickerContainerClassName: "products__item-sticker",
  outOfStockLabelClassName: "products__item-sticker--outofstock",
  saleLabelClassName: "products__item-sticker--sale",
  preOrderLabelClassName: "products__item-sticker--preorder",
  newLabelClassName: "products__item-sticker--new",
  buttonClassName: "products__item--buttonQuickview",
  salePriceClassName: "products__item--content-price--sale",
};

const classesPlaceholderFilter = {
  placeholderList: "placeholder-item placeholder-item__header--nav-mobile",
};

const classesPlaceholderProduct = {
  placeholderImage: "placeholder-item placeholder-item__product--card",
};

const classesProductCategory = {
  parentCategoryClassName: "category_order",
  categoryItemClassName: "category_list",
  categoryValueClassName: "category_list_link",
  categoryNameClassName: "category_list_item",
  selectedCategoryClassName : "category_list_selected",
  categoryNumberClassName: "ml-1",
  dropdownIconClassName: "d-none",
};

const classesEmptyComponent = {
  emptyContainer: "products__empty",
  emptyTitle: "products__empty--title",
  emptyDesc: "products__empty--desc",
};

const classesPlaceholderCatProduct = {
  placeholderTitle: "placeholderItem placeholderItem_productCat__title",
};

const ProductsPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  urlSite,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const router = useRouter();
  const size: any = useWindowSize();
  const categories: string = useQuery("categories");
  const tagname: string | string[] = router.query.tagname || null;

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [sort, setSort] = useState(null);
  const [filterProduct, setFilterProduct] = useState({});
  const [isQuickview, setIsQuickview] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>("");
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] =
    useState<boolean>(false);
  const [showModalAddToCart, setShowModalAddToCart] = useState<boolean>(false);
  const [showModalNotifyMe, setShowModalNotifyMe] = useState<boolean>(false);

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 8,
    totalItems: 0,
  });

  const { currPage, setCurrPage } = useInfiniteScroll(
    pageInfo,
    "products__item"
  );

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("product.title")}`,
  ];

  useEffect(() => {
    setCurrPage(0);
  }, [filterProduct, categories]);

  const handleFailedAddToCart = () => {
    setIsQuickview(false);
    setShowModalErrorAddToCart(true);
  };

  const handleCompleteAddToCart = () => {
    setIsQuickview(false);
    setShowModalAddToCart(true);
  };

  const handleCompleteNotifyMe = () => {
    setIsQuickview(false);
    setShowModalNotifyMe(true);
  };

  const handleFilter = (selectedFilter: any) =>
    setFilterProduct(selectedFilter);

  const toogleFilter = () => setOpenFilter(!openFilter);

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      {isQuickview && slug && (
        <Quickview
          slug={slug}
          setIsQuickView={setIsQuickview}
          handleFailedAddToCart={handleFailedAddToCart}
          handleCompleteAddToCart={handleCompleteAddToCart}
          handleCompleteNotifyMe={handleCompleteNotifyMe}
          i18n={i18n}
          urlSite={urlSite}
        />
      )}
      {showModalNotifyMe && (
        <Popup setPopup={setShowModalNotifyMe} withClose={false}>
          <div className="product-detail_errorAddCart">
            <h3 className="product-detail_errorAddCartTitle">
              {i18n.t("product.notifyTitleSuccess")}
            </h3>
            <p className="product-detail_errorAddCartDesc">
              {i18n.t("product.notifySuccess")}
            </p>
            <button
              className="btn btn-orange btn-long mt-3"
              onClick={() => {
                setShowModalNotifyMe(false);
                Router.push("/[lng]/products", `/${lng}/products`);
              }}
            >
              {i18n.t("global.continueShopping")}
            </button>
          </div>
        </Popup>
      )}
      {showModalAddToCart && (
        <Popup setPopup={setShowModalAddToCart} withClose={false}>
          <div className="product-detail_errorAddCart">
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="6x"
              color="#00BA3F"
              className="mb-4"
            />
            <p className="product-detail_errorAddCartDesc">
              {i18n.t("product.successAddToCart")}
            </p>
            <button
              className="col-12 btn login-page-btnLogin btn-long mt-4"
              onClick={() => {
                setShowModalAddToCart(false);
                Router.push("/[lng]/cart", `/${lng}/cart`);
              }}
            >
              {i18n.t("cart.title")}
            </button>
            <button
              className="col-12 btn product-detail_addToCartBtn-product btn-black-outer btn-long mt-3"
              onClick={() => {
                setShowModalAddToCart(false);
                Router.push("/[lng]/products", `/${lng}/products`);
              }}
            >
              {i18n.t("global.continueShopping")}
            </button>
          </div>
        </Popup>
      )}
      {showModalErrorAddToCart && (
        <Popup setPopup={setShowModalErrorAddToCart}>
          <div className="product-detail_errorAddCart">
            <h3 className="product-detail_errorAddCartTitle">
              {i18n.t("cart.errorSKUTitle")}
            </h3>
            <p className="product-detail_errorAddCartDesc">
              {i18n.t("cart.errorSKUDetail")}{" "}
            </p>
          </div>
        </Popup>
      )}
      <div className="top-head">
        <h3 className="text-capitalize">
          {categories
            ? convertToTextFromQuery(categories)
            : i18n.t("product.all")}
        </h3>
      </div>
        <Breadcrumb className="breadcrumb" links={linksBreadcrumb} lng={lng} />
      <div className="contain-product">
        <div className="col-12">
          <ProductCategory
            classes={classesProductCategory}
            showCategoryNumber={false}
            loadingComponent={
              <div className="container">
                <div className="row">
                  <div className="col-6 col-md-3 mb-4">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withTitle
                    />
                  </div>
                  <div className="col-6 col-md-3 mb-4">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withTitle
                    />
                  </div>
                  <div className="col-6 col-md-3 mb-4">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withTitle
                    />
                  </div>
                  <div className="d-none d-md-block col-6 col-md-3 mb-4">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withTitle
                    />
                  </div>
                  <div className="d-none d-md-block col-6 col-md-3 mb-4">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withTitle
                    />
                  </div>
                  <div className="d-none d-md-block col-6 col-md-3 mb-4">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withTitle
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>
        <div className="contain">
          <div className="row">
            <div className="col-12 section-sort">
              <a onClick={toogleFilter} className="categories__item click-sort">
                <FontAwesomeIcon
                  className="categories__item--icon ml-2"
                  icon={faSlidersH}
                />
                <span className="categories__item--title">
                  {i18n.t("product.filter")}
                </span>
              </a>
              <div className="nonclick-sort">
                <div className="sort-items__item">
                  <FontAwesomeIcon
                    className="sort-items__item--icon ml-2"
                    icon={faSlidersH}
                  />
                  <span className="sort-items__item--title">
                    {i18n.t("product.filter")}
                  </span>
                </div>
              </div>
              <ProductSort
                classes={classesProductSort}
                type="dropdown"
                handleSort={(selectedSort: any) => {
                  setSort(selectedSort);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2 sidebar">
              <ProductFilter
                classes={classesProductFilter}
                withPriceInput={true}
                withPriceValueLabel
                withTooltip
                tagType="radio"
                variantType="radio"
                colorFilterType="radio"
                handleFilter={handleFilter}
                loadingComponent={
                  <Placeholder
                    classes={classesPlaceholderFilter}
                    withList={true}
                    listMany={10}
                  />
                }
              />
            </div>
            <div className="col-12  col-lg-10">
              <div className="row products">
                {Array.from(Array(currPage + 1)).map((_, i) => (
                  <Products
                    key={i}
                    tagName={tagname}
                    pageNumber={i}
                    itemPerPage={6}
                    getPageInfo={setPageInfo as any}
                    collectionSlug={categories}
                    isQuickView={setIsQuickview}
                    getQuickViewSlug={setSlug}
                    quickViewFeature={true}
                    sort={sort}
                    filter={filterProduct}
                    withSeparatedVariant={true}
                    callPagination={true}
                    paginationClasses={classesPagination}
                    classes={classesProducts}
                    fullPath={`product/{id}`}
                    pathPrefix={`product`}
                    lazyLoadedImage={false}
                    thumborSetting={{
                      width: size.width < 575 ? 350 : 500,
                      format: "webp",
                      quality: 85,
                    }}
                    emptyStateComponent={
                      <div className="col-12">
                        <EmptyComponent
                          classes={classesEmptyComponent}
                          logo={
                            <FontAwesomeIcon
                              icon={faBoxOpen}
                              className="products__empty--icon"
                            />
                          }
                          title={i18n.t("product.isEmpty")}
                          desc={i18n.t("product.isEmptyDesc")}
                        />
                      </div>
                    }
                    loadingComponent={
                      <>
                        <div
                          className="col-6 col-md-4"
                          style={{ marginTop: 10 }}
                        >
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage={true}
                          />
                        </div>
                        <div
                          className="col-6 col-md-4"
                          style={{ marginTop: 10 }}
                        >
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage={true}
                          />
                        </div>
                        <div
                          className="col-6 col-md-4"
                          style={{ marginTop: 10 }}
                        >
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage={true}
                          />
                        </div>
                        <div
                          className="col-6 col-md-4"
                          style={{ marginTop: 10 }}
                        >
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage={true}
                          />
                        </div>
                        <div
                          className="col-6 col-md-4"
                          style={{ marginTop: 10 }}
                        >
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage={true}
                          />
                        </div>
                        <div
                          className="col-6 col-md-4"
                          style={{ marginTop: 10 }}
                        >
                          <Placeholder
                            classes={classesPlaceholderProduct}
                            withImage={true}
                          />
                        </div>
                      </>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideMenu
        openSide={openFilter}
        toogleSide={toogleFilter}
        positionSide="left"
      >
        <ProductFilter
          classes={classesProductFilter}
          withPriceValueLabel
          withTooltip
          handleFilter={handleFilter}
          loadingComponent={
            <Placeholder
              classes={classesPlaceholderFilter}
              withList={true}
              listMany={10}
            />
          }
        />
      </SideMenu>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`);

  const brand = await useBrand(req);
  const urlSite = `https://${req.headers.host}/${params.lng}/product/${params.slug}`;

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || "",
      urlSite,
    },
  };
};

export default ProductsPage;
