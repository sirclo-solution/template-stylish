/* library package */
import { FC } from 'react'
import { BanksAccount as BanksAccountList } from '@sirclo/nexus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import {
  ChevronUp,
  ChevronDown,
  Copy
} from 'react-feather'

/* component */
import Loader from 'components/Loader/Loader'

/* styles */
import stylesBanks from 'public/scss/components/BanksAccount.module.scss'



const BanksAccount: FC = () => {

  const classesBankAccount = {
    bankAccountInformationClassName: stylesBanks.bank_information,
    bankAccountContainerClassName: stylesBanks.bank_container,
    bankAccountHeaderClassName: stylesBanks.bank_header,
    bankAccountSectionClassName: stylesBanks.bank_section,
    bankAccountLogoClassName: stylesBanks.bank_logoBank,
    bankAccountBodyClassName: stylesBanks.bank_body,
    bankAccountInfoAccountClassName: stylesBanks.bank_infoAccount,
    bankAccountNumberSectionClassname: stylesBanks.bank_numberSection,
    bankAccountCopyButtonClassName: stylesBanks.bank_buttonIcon,
    bankAccountIconCollapseClassName: stylesBanks.bank_buttonIcon,
    bankAccountLabelAccountNameClassName: stylesBanks.bank_name
  }

  return (
    <BanksAccountList
      classes={classesBankAccount}
      loadingComponent={<Loader color="text-light" />}
      onSuccessMsg={(msg) => toast.success(<div><FontAwesomeIcon icon={faCheckCircle}/> {msg}</div> )}
      icon={{
        chevronUp: <ChevronUp/>,
        chevronDown: <ChevronDown />,
        copy: <Copy />
      }}
    />
  )
}

export default BanksAccount;