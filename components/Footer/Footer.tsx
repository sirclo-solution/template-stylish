/* library package */
import { FC } from 'react'
import { useRouter } from 'next/router'
import {
  Widget,
  NewsletterForm,
  SocialMediaIcons,
  useI18n,
  isCopyrightAllowed
} from '@sirclo/nexus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faTiktok
} from '@fortawesome/free-brands-svg-icons'
import {
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

/* component */
import MobileFooter from './MobileFooter'


const newsletterClasses = {
  containerClassName: "newsletter",
  labelClassName: "newsletter-label",
  inputClassName: "newsletter-input",
  buttonClassName: "btn btn-orange newsletter-input-btn",
};

const socialMediaIcons = {
  facebook: <FontAwesomeIcon icon={faFacebookF} className="icon-sosmed" />,
  twitter: <FontAwesomeIcon icon={faTwitter} className="icon-sosmed" />,
  instagram: <FontAwesomeIcon icon={faInstagram} className="icon-sosmed" />,
  youtube: <FontAwesomeIcon icon={faYoutube} className="icon-sosmed" />,
  tiktok: <FontAwesomeIcon icon={faTiktok} className="icon-sosmed" />
};

const classesMediaSocial = {
  socialMediaIconContainer: "socialIcons",
  socialMediaIcon: "circle-icon text-white",
};

const Footer: FC<any> = ({ brand }) => {
  const router = useRouter();
  const i18n: any = useI18n();
  const allowedCopyright = isCopyrightAllowed();

  return (
    <>
      <footer className={
        (
          router.pathname === "/[lng]/cart" ||
          router.pathname === "/[lng]/place_order" ||
          router.pathname === "/[lng]/shipping_method"
        ) ? "d-none d-lg-block" : ""
      }>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-3 footer__widget">
                <h3>{i18n.t("footer.newsletter")}</h3>
                <p>{i18n.t("footer.newsletterDesc")}</p>
                <NewsletterForm
                  classes={newsletterClasses}
                  
                  buttonComponent={<>{i18n.t("footer.subscribe")}</>}
                  onComplete={() => toast.success(<div><FontAwesomeIcon icon={faCheckCircle}/>{i18n.t("newsletter.submitSuccess")}</div>)}
                  onError={() => toast.error(i18n.t("newsletter.submitError"))}
                />
                <div className="footer__widget--socialMedia">
                  <SocialMediaIcons
                    socialMediaIcons={socialMediaIcons}
                    classes={classesMediaSocial}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <Widget pos="footer-4" widgetClassName="footer__widget" />
              </div>
              <Widget pos="footer-1" widgetClassName="col-md-2 footer__widget footer__widget-links d-none d-lg-block" />
              <Widget pos="footer-2" widgetClassName="col-md-2 footer__widget footer__widget-links d-none d-lg-block" />
              <Widget pos="footer-3" widgetClassName="col-md-2 footer__widget footer__widget-links d-none d-lg-block" />
              <MobileFooter />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          {allowedCopyright ?
            <>
              {brand?.settings?.websiteTitle || ""}
              {(brand?.settings?.websiteTitle && allowedCopyright) && ` - `}
              POWERED BY&nbsp;<a href="https://store.sirclo.com" target="_blank">SIRCLO</a>
            </>
            :
            <Widget
              pos="copyright-and-policy"
              thumborSetting={{
                width: 1,
                format: 'webp',
                quality: 5,
              }}
            />
          }
        </div>
      </footer>
    </>
  );
}

export default Footer;