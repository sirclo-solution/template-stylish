/* library package */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart, useI18n } from '@sirclo/nexus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingCart,
  faUserCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'

/* component */
const SideMenu = dynamic(() => import('../SideMenu/SideMenu'))
const CartSideMenu = dynamic(() => import('../CartSideMenu/CartSideMenu'))
const DropdownNav = dynamic(() => import('./DropdownNav'))
const Search = dynamic(() => import('./Search'))
const PrivateComponent = dynamic(() =>import("@sirclo/nexus").then((mod) => mod.PrivateComponent))

const ProfileMenu = ({
  lng,
  actionLogout,
  searchProduct
}) => {
  const router = useRouter();

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const i18n: any = useI18n();
  const { data } = useCart();

  useEffect(() => {
    setOpenSearch(false);
  }, [router.query]);

  const toogleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const toogleCart = () => {
    const linkRedirectToCart = [
      "/[lng]/cart",
      "/[lng]/place_order",
      "/[lng]/shipping_method",
      "/[lng]/payment_method",
    ];

    if (linkRedirectToCart.includes(router.pathname)) {
      router.push(`/[lng]/cart`, `/${lng}/cart`);
    } else if (router.pathname === "/[lng]/payment_notif/[orderID]") {
      setOpenCart(false);
    } else {
      setOpenCart(!openCart);
    }
  };

  return (
    <div className="navbar-nav navbar-stylish">
      <a
        className="navbar-profile-menu__cart d-flex align-items-center px-4 line-stylish"
        onClick={(e) => e.preventDefault()}
        href="#"
      >
        <FontAwesomeIcon
          className="nav--icon text-white"
          icon={faShoppingCart}
          onClick={toogleCart}
        />
        <span className="badge-cart" onClick={toogleCart}>
          {data?.totalItem}
        </span>
      </a>
      <DropdownNav
        title={
          <PrivateComponent
            Auth={
              <>
                <FontAwesomeIcon className="nav--icon text-white" icon={faUserCircle} />&nbsp;{i18n.t("header.account")}
              </>
            }
            NoAuth={
              <>
                <FontAwesomeIcon className="nav--icon text-white" icon={faUserCircle} />&nbsp;{i18n.t("header.login")}
              </>
            }
          />
        }
      >
        <PrivateComponent
          Auth={
            <>
              <div
                className="menu-link"
                onClick={() => router.push(`/[lng]/account`, `/${lng}/account`)}
              >
                <a
                  className="dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  href="#"
                >
                  {i18n.t("header.myAccount")}
                </a>
              </div>
              <div
                className="menu-link"
                onClick={actionLogout}
              >
                <a
                  className="dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  href="#"
                >
                  {i18n.t("header.logout")}
                </a>
              </div>
            </>
          }
          NoAuth={
            <div
              className="menu-link"
              onClick={() => router.push(`/[lng]/login`, `/${lng}/login`)}
            >
              <a
                className="dropdown-link"
                onClick={(e) => e.preventDefault()}
                href="#"
              >
                {i18n.t("header.login")}
              </a>
            </div>
          }
        />
      </DropdownNav>
      <a
        onClick={(e) => e.preventDefault()}
        href="#"
        className="d-flex align-items-center px-4 navbar-profile-menu__cart"
        style={{ backgroundColor: "#FBC02D" }}
      >
        <FontAwesomeIcon
          className="nav--icon text-white"
          icon={faSearch}
          onClick={toogleSearch}
        />
      </a>
      <SideMenu
        openSide={openCart}
        toogleSide={toogleCart}
        positionSide="right"
      >
        <CartSideMenu />
      </SideMenu>
      <SideMenu
        openSide={openSearch}
        toogleSide={toogleSearch}
        positionSide="right"
      >
        <Search searchProduct={searchProduct} />
      </SideMenu>
    </div>
  );
};

export default ProfileMenu;
