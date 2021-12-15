/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  Contact,
  Widget,
  useI18n,
  isEnquiryAllowed
} from '@sirclo/nexus'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

/* library template */
import useWindowSize from 'lib/utils/useWindowSize'
import { useBrand } from 'lib/utils/useBrand'

/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Placeholder from 'components/Placeholder'

const classesContact = {
  containerClassName: "contact-page-container",
  mapClassName: "d-none",
  titleClassName: "contact-page-title",
  inputContainerClassName: "sirclo-form-row",
  inputClassName: "form-control sirclo-form-input",
  buttonClassName: "btn login-page-btnLogin btn-long float-right",
};

const classesPlaceholderContact = {
  placeholderImage: "placeholder-item placeholder-item__contact--logo",
  placeholderList: "placeholder-item placeholder-item__contact--caption"
}

const ContactPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();
  const allowedEnquiry = isEnquiryAllowed();

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("contact.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      {allowedEnquiry &&
        <>
        <div className="top-head">
          <h3 className="text-capitalize-20">
            {i18n.t("contact.title")}
          </h3>
        </div>
        <Breadcrumb
          links={linksBreadcrumb}
          lng={lng}
        />
          <div className="custom-container mb-5">
            <div className="row">
              <div className="col-12 col-sm-12 col-lg-12">
                <Contact
                  classes={classesContact}
                  isAddressDetail={false}
                  onCompleted={() => toast.success(<div><FontAwesomeIcon icon={faCheckCircle}/>{i18n.t("contact.submitSuccess")}</div>)}
                  onError={() => toast.error(i18n.t("contact.submitError"))}
                />
              </div>
              <br></br><br></br>
              <div className="col-12 col-sm-12 col-lg-12 content-contact">
                <Widget
                  pos="login-image"
                  widgetClassName="contact-info"
                  thumborSetting={{
                    width: size.width < 768 ? 375 : 512,
                    format: "webp",
                    quality: 85,
                  }}
                  loadingComponent={
                    <Placeholder classes={classesPlaceholderContact} withImage withList listMany={3} />
                  }
                />
              </div>
            </div>
          </div>
        </>
      }
    </Layout>
  );
};

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

export default ContactPage;
