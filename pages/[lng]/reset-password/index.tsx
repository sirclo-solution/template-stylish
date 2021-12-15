/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { SetNewPassword, useI18n } from '@sirclo/nexus'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

/* library template */
import { useBrand } from 'lib/utils/useBrand'

/* component */
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'

const classesSetNewPassword = {
  containerClassName: "forgot-password-page-form",
  inputContainerClassName: "sirclo-form-row",
  inputClassName: "form-control sirclo-form-input",
  passwordViewButtonClassName: "sirclo-form-input-btn",
  buttonClassName: "btn login-page-btnLogin btn-long float-right",
  errorClassName: "error",
  passwordStrengthBarContainerClassName:
    "sirclo-form-password-strength-bar-container",
  passwordStrengthBarClassName: "sirclo-form-password-strength-bar",
  passwordStrengthLabelClassName: "sirclo-form-password-strength-label",
  passwordCriteriaListClassName: "sirclo-form-password-criteria-list",
  passwordCriteriaClassName: "sirclo-form-password-criteria",
};

const ResetPasswordPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <div className="container">
        <div className="forgot-password-page-container">
          <div className="forgot-password-page-inner">
            <h3 className="forgot-password-page-title">
              {i18n.t("resetPassword.setYourNewPassword")}
            </h3>
            <span className="forgot-password-page-subtitle">
              {i18n.t("resetPassword.setNewPasswordDesc")}
            </span>
            <SetNewPassword
              classes={classesSetNewPassword}
              onErrorMsg={toast.error}
              onSuccessMsg={(msg) => toast.success(<div><FontAwesomeIcon icon={faCheckCircle}/> {msg}</div> )}
              passwordViewIcon={
                <FontAwesomeIcon icon={faEye} className="icon-password" />
              }
              passwordHideIcon={
                <FontAwesomeIcon icon={faEyeSlash} className="icon-password" />
              }
              passwordUnfulfilledCriteriaIcon={
                <FontAwesomeIcon icon={faCheckCircle} height="1.25em" />
              }
              passwordFulfilledCriteriaIcon={
                <FontAwesomeIcon icon={faCheckCircle} height="1.25em" />
              }
              loadingComponent={<Loader color="text-light" />}
            />
          </div>
        </div>
      </div>
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
};

export default ResetPasswordPage;
