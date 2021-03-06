/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faUserCircle,
  faEnvelope,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import {
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons'
import {
  Login,
  WhatsAppOTPInput,
  SingleSignOn,
  useI18n
} from '@sirclo/nexus'

/* library template */
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/utils/useBrand'
import { useGoogleAuth } from 'lib/utils/useGoogleAuth'
import { useFacebookAuth } from 'lib/utils/useFacebookAuth'
import { useWhatsAppOTPSetting } from 'lib/utils/useSingleSignOn'

/* component */
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import LoaderPages from 'components/Loader/LoaderPages'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

const loginClasses = {
  containerClassName: "login-page-form",
  inputContainerClassName: "sirclo-form-row",
  inputClassName: "form-control sirclo-form-input",
  buttonClassName: "btn login-page-btnLogin btn-long btn-center col-12 col-md-12",
  footerClassName: "footer",
  forgotPasswordClass: "forgot-password",
  forgotLinkClass: "forgot-link",
}

const classesWhatsAppOTP = {
  //form
  inputFormTitleClassName: "login-page-title",
  inputFormDescriptionClassName: "login-page-subtitle",
  formWAContainerClassName: "login-page-form",
  inputLabelClassName: "login-page-label",
  inputWANumberClassName: "form-control sirclo-form-input",
  btnSubmitClassName: "btn login-page-btnLogin btn-long btn-center col-12 col-md-12",
  inputDescriptionClassName: "text-center text-margin",
  termsAndConditionClassName: "login-page-pointer",
  privacyPolicyClassName: "login-page-pointer",
  //confirmation
  confirmationContainerClassName: "login-page-column",
  confirmationHeaderContainerClassName: "w-100",
  confirmationBackContainerClassName: "login-page-back",
  confirmationBackLabelClassName: "login-page-backTitle ml-2",
  confirmationHeaderTitleClassName: "login-page-title mb-3",
  confirmationHeaderSubtitleClassName: "loglogin-page-btnLoginin-page-subtitle",
  confirmationButtonOTPClassName: "btn btn-dark-blue my-5 btn-long btn-center col-12 col-md-12",
  anotherLoginMethodClassName: "login-page-pointer",
  //verification
  verificationContainerClassName: "login-page-column",
  verificationHeaderClassName: "text-center",
  verificationTitleClassName: "login-page-title mt-2",
  verificationBodyClassName: "login-page-column",
  infoLabelClassName: "login-page-subtitle text-center mt-2",
  fieldOTPInputContainerClassName: "login-page-inputContainer",
  fieldOTPInputClassName: "form-control sirclo-form-input login-page-inputOtp",
  verificationFooterClassName: "login-page-column",
  btnResendOTPClassName: "btn login-page-btnLogin btn-long btn-center col-12 col-md-12",
  btnChangeMethodClassName: "login-page-pointer",
  //choose account
  chooseAccountContainerClassName: "login-page-column",
  chooseAccountHeaderClassName: "text-center",
  chooseAccountTitleClassName: "login-page-title",
  chooseAccountDescriptionClassName: "login-page-subtitle",
  accountOptionsContainerClassName: "login-page-accountOptionContainer",
  accountOptionClassName: "login-page-accountOption",
  selectedAccountClassName: "login-page-accountOptionSelected",
  accountContainerClassName: "login-page-accountContainer",
  accountNameClassName: "login-page-accountName",
  accountEmailClassName: "login-page-accountEmail",
  btnChooseAccountClassName: "btn btn-orange btn-long btn-center"
}

const LoginPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth,
  hasOtp
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [step, setStep] = useState<string>("whatsapp-input");

  const brandName = (brand: string): string => {
    const lower = brand?.toLowerCase();
    return brand?.charAt(0).toUpperCase() + lower?.slice(1);
  }



  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <section>
        <div className="container">
          <div className="login-page-container">
            <div className="login-page-inner">
              {step === "email" || !hasOtp ?
                <>
                  <h3 className="login-page-title">
                    {i18n.t("login.welcome")}
                  </h3>
                  <span className="login-page-subtitle">
                    {i18n.t("login.credential")}
                  </span>
                  <Login
                    classes={loginClasses}
                    onCompletedMsg={(msg) => toast.success(<div><FontAwesomeIcon icon={faCheckCircle}/> {msg}</div>)}
                    onErrorMsg={(msg) => toast.error(msg)}
                    passwordViewIcon={<FontAwesomeIcon className="icon-password" icon={faEye} />}
                    passwordHideIcon={<FontAwesomeIcon className="icon-password" icon={faEyeSlash} />}
                    loadingComponent={<Loader color="text-light" />}
                  />
                </> :
                <>
                  <WhatsAppOTPInput
                    brandName={brandName(brand?.name)}
                    onStepChange={setStep}
                    classes={classesWhatsAppOTP}
                    loginRedirectPath="account"
                    inputPlaceholder={i18n.t("whatsAppOTPInput.inputPlaceholder")}
                    onErrorMsg={(msg) => toast.error(msg)}
                    onCompletedMsg={(msg) => toast.success(<div><FontAwesomeIcon icon={faCheckCircle}/> {msg}</div>)}
                    loadingComponent={
                      <LoaderPages otherClassNameInner="login-page-innerOtp" />
                    }
                    icons={{
                      account: <FontAwesomeIcon className="icon-password" icon={faUserCircle} size="2x" />,
                      back: <FontAwesomeIcon className="icon-password" icon={faArrowLeft} />
                    }}
                  />
                </>
              }
              {(step === 'email' || step === 'whatsapp-input') &&
                <>
                  {(hasGoogleAuth || hasFacebookAuth || hasOtp) &&
                    <label className="login-page-orTitle">
                      <span>{i18n.t("testimonials.or")}</span>
                    </label>
                  }
                  <div className="login-page-withGoogle col-12 col-md-12">
                    {(hasGoogleAuth || hasFacebookAuth) &&
                      <SingleSignOn
                        className="login-page-withGoogleButton"
                        buttonText={i18n.t("login.sso")}
                        onErrorMsg={(msg: string) => toast.error(msg)}
                        loadingComponent={
                          <div className="quickdetail__overlay">
                            <LoaderPages />
                          </div>
                        }
                      />
                    }
                    {hasOtp &&
                      <button
                        className="login-page-withGoogleButton mt-2"
                        onClick={() => {
                          if (step === 'email') setStep('whatsapp-input')
                          if (step === 'whatsapp-input') setStep('email')
                        }}
                      >
                        <FontAwesomeIcon
                          className="icon-password"
                          icon={step === 'email' ? faWhatsapp : faEnvelope}
                        />
                        <span>
                          {step === 'email' ? i18n.t("login.whatsapp") : i18n.t("login.withEmail")}
                        </span>
                      </button>
                    }
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const cookies = parseCookies(req)
  redirectIfAuthenticated(res, cookies, 'account')
  const hasGoogleAuth = await useGoogleAuth(req)
  const hasFacebookAuth = await useFacebookAuth(req)
  const hasOtp = await useWhatsAppOTPSetting(req)

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      hasGoogleAuth,
      hasFacebookAuth,
      hasOtp,
      brand: brand || ''
    },
  }
}

export default LoginPage
