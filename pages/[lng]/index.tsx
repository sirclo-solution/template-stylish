/* library package */
import { useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Router from 'next/router'
import Carousel from '@brainhubeu/react-carousel'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {
  Banner,
  getBanner,
  Products,
  ProductCategory,
  useI18n
} from '@sirclo/nexus'
const Widget = dynamic(
  () => import('@sirclo/nexus').then((mod) => mod.Widget),
  { ssr: false }
);

/* library template */
import useWindowSize from 'lib/utils/useWindowSize'
import { useSizeBanner } from 'lib/useSizeBanner'
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/utils/useBrand'
import { GRAPHQL_URI } from 'lib/Constants'

/* component */
import Layout from 'components/Layout/Layout'
import InstagramFeed from 'components/InstagramFeed/InstagramFeed'
const Quickview = dynamic(() => import('components/Quickview/Quickview'))
const Popup = dynamic(() => import('components/Popup/Popup'))
const Placeholder = dynamic(() => import('components/Placeholder'))

const bannerClasses = {
  imageContainerClassName: "banner-carousel__header",
  linkClassName: "banner-carousel__link",
  imageClassName: "banner-carousel__image"
};

const classesProductCategory = {
  parentCategoryClassName: "row product-category",
  categoryItemClassName: "col-6 col-md-3 product-category__items",
  categoryValueClassName: "product-category__items--value",
  dropdownIconClassName: "d-none",
  imgContainerClassName: "product-category__items--images",
  imgClassName: "product-category__items--images-image",
  categoryNameClassName: "product-category__items--images-name",
};

const classesProducts = {
  productContainerClassName: "col-6 col-md-4 products__item",
  priceClassName: "products__item--content-price--normal",
  productImageContainerClassName: "products__item--image-container",
  productImageClassName: "products__item--image",
  productLabelContainerClassName: "products__item--content",
  productTitleClassName: "products__item--content-title",
  productPriceClassName: "products__item--content-price",
  stickerContainerClassName: "products__item-sticker",
  outOfStockLabelClassName: "products__item-sticker--outofstock",
  comingSoonLabelClassName: "products__item-sticker--comingsoon",
  openOrderLabelClassName: "products__item-sticker--openorder",
  saleLabelClassName: "products__item-sticker--sale",
  preOrderLabelClassName: "products__item-sticker--preorder",
  newLabelClassName: "products__item-sticker--new",
  buttonClassName: "products__item--buttonQuickview",
  salePriceClassName: "products__item--content-price--sale",
};

const classesPlaceholderBanner = {
  placeholderImage: "placeholder-item placeholder-item__banner",
};

const classesPlaceholderCatProduct = {
  placeholderImage: "placeholder-item placeholder-item__product-cat--card",
};

const classesPlaceholderProduct = {
  placeholderImage: "placeholder-item placeholder-item__product--card",
};

const classesPlaceholderWidget = {
  placeholderImage: "placeholder-item placeholder-item__widget--banner",
};

const Home: React.FC<any> = ({
  lng,
  lngDict,
  brand,
  urlSite,
  dataBanners
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();

  const [isQuickview, setIsQuickview] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>("");
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false);
  const [showModalAddToCart, setShowModalAddToCart] = useState<boolean>(false);
  const [showModalNotifyMe, setShowModalNotifyMe] = useState<boolean>(false);

  const handleFailedAddToCart = () => {
    setIsQuickview(false);
    setShowModalErrorAddToCart(true);
  }

  const handleCompleteAddToCart = () => {
    setIsQuickview(false);
    setShowModalAddToCart(true);
  }

  const handleCompleteNotifyMe = () => {
    setIsQuickview(false);
    setShowModalNotifyMe(true);
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
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
      {showModalNotifyMe &&
        <Popup
          setPopup={setShowModalNotifyMe}
          withClose={false}
        >
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
              }}>
              {i18n.t("global.continueShopping")}
            </button>
          </div>
        </Popup>
      }
      {showModalAddToCart &&
        <Popup
          setPopup={setShowModalAddToCart}
          withClose={false}
        >
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
              className="btn login-page-btnLogin btn-long mt-4"
              onClick={() => {
                setShowModalAddToCart(false);
                Router.push("/[lng]/cart", `/${lng}/cart`);
              }}>
              {i18n.t("cart.title")}
            </button>
            <button
              className="btn btn-black-outer btn-long mt-3"
              onClick={() => {
                setShowModalAddToCart(false);
                Router.push("/[lng]/products", `/${lng}/products`);
              }}>
              {i18n.t("global.continueShopping")}
            </button>
          </div>
        </Popup>
      }
      {showModalErrorAddToCart &&
        <Popup setPopup={setShowModalErrorAddToCart}>
          <div className="product-detail_errorAddCart">
            <h3 className="product-detail_errorAddCartTitle">{i18n.t("cart.errorSKUTitle")}</h3>
            <p className="product-detail_errorAddCartDesc">{i18n.t("cart.errorSKUDetail")} </p>
          </div>
        </Popup>
      }
      <div className="banner-carousel">
        <Banner
          data={dataBanners?.data}
          Carousel={Carousel}
          classes={bannerClasses}
          lazyLoad
          autoPlay={5000}
          dots
          infinite
          thumborSetting={{
            width: useSizeBanner(size.width),
            format: "webp",
            quality: 90,
          }}
          loadingComponent={
            <Placeholder classes={classesPlaceholderBanner} withImage />
          }
        />
      </div>
      <section>
        <div className="custom-container text-center py-3 title-text">{i18n.t("home.informationProductsSale")}</div>
      </section>
      <section>
        <div className="custom-container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <LazyLoadComponent>
                <Widget
                  pos="main-content-1"
                  widgetClassName="widget-image-home"
                  thumborSetting={{
                    width: size.width < 768 ? 512 : 800,
                    format: "webp",
                    quality: 85,
                  }}
                  loadingComponent={
                    <Placeholder classes={classesPlaceholderWidget} withImage />
                  }
                />
              </LazyLoadComponent>
            </div>
            <div className="col-sm-12 col-md-6 mt-5">
              <div className="aboutus__heading">{ i18n.t("home.aboutUs")}</div>
              <div className="font-weight-bold py-2 aboutus__title">{ i18n.t("home.aboutUsTitle")}</div>
              <div className="aboutus__desc">{ i18n.t("home.aboutUsDesc")}</div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="custom-container">
          <LazyLoadComponent>
            <div className="heading">
              <h5 className="heading__title">{i18n.t("home.mostPopular")}</h5>
            </div>
            <ProductCategory
              itemPerPage={4}
              classes={classesProductCategory}
              showImages={true}
              thumborSetting={{
                width: size.width < 768 ? 375 : 512,
                format: "webp",
                quality: 85,
              }}
              loadingComponent={
                <div className="row mb-5">
                  <div className="col-3 col-md-3">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withImage
                    />
                  </div>
                  <div className="col-3 col-md-3">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withImage
                    />
                  </div>
                  <div className="col-3 col-md-3">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withImage
                    />
                  </div>
                  <div className="col-3 col-md-3">
                    <Placeholder
                      classes={classesPlaceholderCatProduct}
                      withImage
                    />
                  </div>
                </div>
              }
              imageFallback={
                <img
                  className={classesProductCategory.imgClassName}
                  src="/images/image-category-placeholder.webp"
                  alt="Placeholder"
                />
              }
            />
          </LazyLoadComponent>
            <div className="heading">
              <h5 className="heading__title">{i18n.t("home.newArrivalProducts")}</h5>
            </div>
          <div className="row best-seller">
            <LazyLoadComponent>
              <Products
                itemPerPage={6}
                withSeparatedVariant={true}
                isQuickView={setIsQuickview}
                getQuickViewSlug={setSlug}
                quickViewFeature={true}
                classes={classesProducts}
                lazyLoadedImage={false}
                thumborSetting={{
                  width: size.width < 768 ? 375 : 512,
                  format: "webp",
                  quality: 85,
                }}
                loadingComponent={
                  <>
                    <div className="col-6 col-md-4 mb-4">
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withImage
                      />
                    </div>
                    <div className="col-6 col-md-4 mb-4">
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withImage
                      />
                    </div>
                    <div className="col-6 col-md-4 mb-4">
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withImage
                      />
                    </div>
                  </>
                }
              />
            </LazyLoadComponent>
          </div>
          <div className="text-center">
            <Link href="/[lng]/products" as={`/${lng}/products`}>
              <a className="btn btn-black-outer btn-short py-3">
                {i18n.t("home.showAll")}
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="custom-container">
          <div className="heading">
            <h5 className="heading__title">{i18n.t("home.featuredProducts")}</h5>
          </div>
          <div className="row best-seller">
            <LazyLoadComponent>
              <Products
                itemPerPage={6}
                withSeparatedVariant={true}
                isQuickView={setIsQuickview}
                getQuickViewSlug={setSlug}
                quickViewFeature={true}
                classes={classesProducts}
                lazyLoadedImage={false}
                thumborSetting={{
                  width: size.width < 768 ? 375 : 512,
                  format: "webp",
                  quality: 85,
                }}
                loadingComponent={
                  <>
                    <div className="col-6 col-md-4 mb-4">
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withImage
                      />
                    </div>
                    <div className="col-6 col-md-4 mb-4">
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withImage
                      />
                    </div>
                    <div className="col-6 col-md-4 mb-4">
                      <Placeholder
                        classes={classesPlaceholderProduct}
                        withImage
                      />
                    </div>
                  </>
                }
              />
            </LazyLoadComponent>
          </div>
          <div className="text-center">
            <Link href="/[lng]/products" as={`/${lng}/products`}>
              <a className="btn btn-black-outer btn-short py-3">
                {i18n.t("home.showAll")}
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="heading">
          {brand?.socmedSetting?.instagramToken &&
            <LazyLoadComponent threshold={300}>
              <div className="heading">
                <h5 className="heading__title"><img src="/icon/instagram.svg" style={{ width: "60px", transform: "translateY(-2px)" }} />{i18n.t("home.followInstagram")} </h5>
              </div>
              <InstagramFeed size={size} />
            </LazyLoadComponent>
          }
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const allowedUri: Array<string> = ["en", "id", "graphql", "favicon.ico"];

  if (allowedUri.indexOf(params.lng.toString()) == -1) {
    const cookies = parseCookies(req);

    res.writeHead(307, {
      Location: cookies.ACTIVE_LNG
        ? "/" + cookies.ACTIVE_LNG + "/" + params.lng
        : "/id/" + params.lng,
    });

    res.end();
  }

  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);
  const urlSite = `https://${req.headers.host}/${params.lng}/product/${params.slug}`;
  const dataBanners = await getBanner(GRAPHQL_URI(req));

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
      urlSite,
      dataBanners
    },
  };
};

export default Home;
