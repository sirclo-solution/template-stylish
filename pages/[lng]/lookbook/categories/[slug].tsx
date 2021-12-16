/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LookbookSingle, useI18n } from '@sirclo/nexus'

/* library template */
import useWindowSize from 'lib/utils/useWindowSize'
import { useBrand } from 'lib/utils/useBrand'

/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

const classesLookbookSingle = {
  containerClassName: "lookbook-detail",
  rowClassName: "card-columns",
  imageClassName: "card lookbook-detail__items",
}

const LookbookSinglePage: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const [title, setTitle] = useState<string>("");
  const size = useWindowSize();

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("lookbook.title")}`, `${title}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <div className="top-head">
        <h3 className="text-capitalize">
        {title}
        </h3>
      </div>
      <Breadcrumb title={title} links={linksBreadcrumb} lng={lng} />
      <section>
        <div className="custom-container">
          <LookbookSingle
            classes={classesLookbookSingle}
            slug={slug}
            getTitle={setTitle}
            thumborSetting={{
              width: size.width < 768 ? 300 : 450,
              format: "webp",
              quality: 85,
            }}
          />

          {/* <div className="lookbook--navigation">
            <div className="m-3">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="lookbook--navigation-icon"
              />
              <div>
                {i18n.t('')}
              </div>
            </div>
            <div className="m-3">
              <FontAwesomeIcon
                icon={faShareAlt}
                className="lookbook--navigation-icon"
              />
              Bagikan
            </div>
          </div> */}
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      slug: params.slug,
      lngDict,
      brand: brand || ''
    },
  };
}

export default LookbookSinglePage;
