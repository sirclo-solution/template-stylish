/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { GiftCard, useI18n } from '@sirclo/nexus'

/* library template */
import { useBrand } from 'lib/utils/useBrand'

/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

const classesGiftCard = {
  containerClassName: "giftcard-page-form",
  inputContainerClassName: "sirclo-form-row",
  labelClassName: "giftcard-label",
  inputClassName: "form-control sirclo-form-input",
  buttonClassName: "btn login-page-btnLogin btn-long float-right"
};

const GiftCardPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("giftCard.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <div className="top-head">
        <h3 className="text-capitalize">
          {i18n.t("giftCard.title")}
        </h3>
      </div>
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <section>
        <div className="custom-container">
          <div className="giftcard-page-container">
            <div className="giftcard-page-inner">
              <GiftCard classes={classesGiftCard} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    },
  };
}

export default GiftCardPage;