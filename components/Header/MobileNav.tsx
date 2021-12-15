/* library package */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Logo, useI18n } from '@sirclo/nexus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faSearch,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import dynamic from 'next/dynamic'

/* component */
import Search from './Search'
import SideMenu from '../SideMenu/SideMenu'
import MobileShortcut from './MobileShortcut'
import Placeholder from '../Placeholder'


const CollapsibleNav = dynamic(() => import('@sirclo/nexus').then((mod) => mod.CollapsibleNav))
const PrivateComponent = dynamic(() => import('@sirclo/nexus').then((mod) => mod.PrivateComponent))

const classesCollapsibleNav = {
  parentNavClassName: "menu-mobile",
  navItemClassName: "menu-mobile__item",
  selectedNavClassName: "menu-mobile__itemActive",
  dropdownIconClassName: "icon-down-mobile",
  childNavClassName: "menu-mobile__sub",
  subChildNavClassName: "menu-mobile__sub",
};

const classesPlaceholderCollapsibleNav = {
  placeholderList: "placeholder-item placeholder-item__header--nav-mobile"
}

const MobileNavButton = ({ lng, actionLogout, searchProduct }) => {
  const i18n: any = useI18n();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false)

  useEffect(() => {
    setOpenMenu(false);
    setOpenSearch(false);
  }, [router.query]);

  const toogleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const toogleSearch = () => {
    setOpenSearch(!openSearch)
  }

  return (
    <>
      <div className="navbar-mobile d-lg-none d-md-flex">
        <div className="container-fluid px-0">
          <div className="d-flex justify-content-between">
            <div className="navbar-mobile__icon px-4">
              <FontAwesomeIcon
                className="mobile-menu-icon"
                icon={faBars}
                onClick={toogleMenu}
              />
            </div>
            <div className="navbar-mobile__logo">
              <LazyLoadComponent
                placeholder={
                  <div className="nav-logo__placeholder"></div>
                }
              >
                <Logo
                  imageClassName="nav-logo"
                  thumborSetting={{
                    width: 400,
                    format: 'webp',
                    quality: 85
                  }}
                />
              </LazyLoadComponent>
            </div>
            <div
              className="navbar-mobile__icon px-4"
              style={{ backgroundColor: "#FBC02D" }}
            >
              <FontAwesomeIcon
                className="mobile-menu-icon"
                icon={faSearch}
                onClick={toogleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      <SideMenu
        openSide={openSearch}
        toogleSide={toogleSearch}
        positionSide="right"
      >
        <Search searchProduct={searchProduct} />
      </SideMenu>
      <SideMenu
        openSide={openMenu}
        toogleSide={toogleMenu}
        positionSide="left"
      >
        <CollapsibleNav
          dropdownIcon={<FontAwesomeIcon icon={faChevronDown} className="icon-down-mobile--svg" />}
          dropdownOpenIcon={<FontAwesomeIcon icon={faChevronUp} className="icon-down-mobile--svg" />}
          classes={classesCollapsibleNav}
          loadingComponent={
            <>
              <Placeholder
                classes={classesPlaceholderCollapsibleNav}
                withList={true}
                listMany={4}
              />
            </>
          }
        />
        <PrivateComponent
          Auth={
            <>
              <hr />
              <span onClick={actionLogout}>{i18n.t("header.logout")}</span>
            </>
          }
          NoAuth={<span></span>}
        />
      </SideMenu>
      <MobileShortcut lng={lng} />
    </>
  )
}

export default MobileNavButton;