/* library package */
import { FC, useState } from 'react'
import {
  OrderSummary,
  CartDetails
} from '@sirclo/nexus'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import {
  faTimes,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'

/* component */
const Popup = dynamic(() => import('components/Popup/Popup'))

const classesOrderSummary = {
  containerClassName: "order-summary-cart",
  headerClassName: "order-summary-cart__header",
  voucherButtonClassName: "order-summary-cart__header--features",

  voucherIconClassName: "order-summary-cart__header--features-icon",
  voucherTextClassName: "order-summary-cart__header--features-label",
  subTotalClassName: "order-summary-cart__body",
  subTotalTextClassName: "order-summary-cart__body--label-subtotal",
  subTotalPriceClassName: "order-summary-cart__body--subtotal",
  footerClassName: "order-summary-cart__footer",
  submitButtonClassName: "px-0 btn btn-blue btn-long btn-45-pad order-summary-cart__submitButton",
  continueShoppingClassName: "d-none",
  popupClassName: "order-summary-cart__overlay",
  voucherContainerClassName: "order-summary-cart__popup",

  closeButtonClassName: "order-summary-cart__popup-close",
  voucherFormContainerClassName: "order-summary-cart__popup-form-container",
  voucherFormClassName: "form-inline sirclo-form-row order-summary-cart__popup-form",
  voucherInputClassName: "form-control cart-control sirclo-form-input order-summary-cart__popup-form-input",
  voucherSubmitButtonClassName: "btn btn-black-outer order-summary-cart__popup-form-button",
  voucherListClassName: "order-summary-cart__popup--voucher",
  voucherListHeaderClassName: "order-summary-cart__popup--voucher-title",
  voucherClassName: "order-summary-cart__popup--voucher-list",
  voucherFooterClassName: "order-summary-cart__popup--voucher-footer",
  voucherApplyButtonClassName: "btn btn-blue",

  pointsButtonClassName: "col-12 order-summary-cart__header--features",
  pointsIconClassName: "order-summary-cart__header--features-icon",
  pointsTextClassName: "order-summary-cart__header--features-label",
  pointsAppliedTextClassName: "order-summary-cart_voucherAppliedText",
  pointsButtonAppliedClassName: "col-12 order-summary-cart_voucherButtonApplied b-right",

  pointsContainerClassName: "order-summary-cart__popup",
  numberOfPointsClassName: "order-summary-cart__popup--points-header",
  pointsFormClassName: "order-summary-cart__popup--points-form",
  changePointsClassName: "order-summary-cart__popup--points-change",
  pointLabelClassName: "order-summary-cart__popup--points-label",
  totalPointsClassName: "order-summary-cart__popup--points-total",
  valueClassName: "order-summary-cart__popup--points-value",
  pointsInsufficientClassName: "order-summary-cart__popup--points-insufficient",
  pointsSubmitButtonClassName: "order-summary-cart__popup--points-submit",
  pointsWarningClassName: "order-summary-cart__popup--points-warning",

  voucherDetailClassName: "order-summary-cart__popup--voucher-detail",
  voucherButtonAppliedClassName: "col-12 order-summary-cart_voucherButtonApplied b-right",
  voucherButtonRemoveClassName: "cursor-pointer order-summary-cart_voucherButtonRemoveCart",
  voucherAppliedTextClassName: "order-summary-cart_voucherAppliedText",
  expandButtonClassName: "order-summary-cart_expandButton",
  expandedDivClassName: "order-summary-cart_expandedDiv",
  expandedPriceClassName: "order-summary-cart_expandedPrice",
};

const classesCartDetails = {
  className: "cartOrderSummaryBox_body",
  cartHeaderClassName: "d-none",
  itemClassName: "cartItem",
  itemImageClassName: "cartItem_image",
  itemTitleClassName: "cartItem_detail",
  itemPriceClassName: "cartItem_priceCalculate",
  itemRegularPriceClassName: "cartItem_priceRegular",
  itemSalePriceClassName: "cartItem_priceSale",
  itemSalePriceWrapperClassName: "cartItem_priceSaleWrapper",
  itemDiscountNoteClassName: "cartItem_discNote",
  itemRegularAmountClassName: "d-none",
  headerQtyClassName: "d-none",
  titleClassName: "cartItem_title",
  itemQtyClassName: "cartItem_qty",
  qtyBoxClassName: "cartItem_qtyBox",
  itemAmountClassName: "cartItem_price",
  itemEditClassName: "d-none",
  itemRemoveClassName: "d-none",
  cartFooterClassName: "cartFooter",
  cartFooterTitleClassName: "d-none",
  cartFooterTextareaClassName: "d-none",
  changeQtyButtonClassName: "d-none",
  cartBodyClassName: "cartOrderSummaryBox_body"
}

const OrderSummaryBox: FC<any> = ({
  i18n,
  auth,
  page,
  withOrderDetail
}) => {
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false);

  const classesOrderSum = () => {
    let classes = classesOrderSummary;

    if(page == "cart"){
      classes.expandedDivClassName = "order-summary-cart_expandedDivCart"
      classes.voucherButtonClassName =  `${auth ? "col-12 b-right" : "col-12"
        } order-summary-cart__header--featuresCart`;
    }else if (page == "place_order" || page == "shipping_method"){
      classes.expandedDivClassName = "order-summary-cart_expandedDiv"
      classes.voucherButtonClassName = `${auth ? "col-12 b-right" : "col-12"
        } order-summary-cart__header--features`;
    }

    classes.voucherButtonAppliedClassName = `${auth ? "col-12 b-right" : "col-12"
      } order-summary-cart_voucherButtonApplied`;

    return classes;
  };

  return (
    <>
      <div className="order-summary-cart__wrapper cart-padding">
        {withOrderDetail &&
          <div className="cartOrderSummaryBox order-1">
            <div className="flex cart_orderSummaryBoxTitle">
              <p className="cartOrderSummaryBox_title">{i18n.t("orderSummary.orderSummary")}</p>
            </div>
            <CartDetails
              withSeparatedVariant={true}
              classes={classesCartDetails}
              itemRedirectPathPrefix={`product`}
              isEditable={true}
              removeIcon={<FontAwesomeIcon icon={faTimes} height="1.25em" />}
              onErrorMsg={(msg) => toast.error(msg)}
            />
          </div>
        }
        <OrderSummary
          classes={classesOrderSum()}
          currency="IDR"
          submitButtonLabel={i18n.t("orderSummary.placeOrder")}
          continueShoppingLabel={i18n.t("orderSummary.continueShopping")}
          page={page}
          continueShoppingRoute="products"
          onAddressInvalid={(e) => toast.error(e)}
          onErrorMsg={() => setShowModalErrorAddToCart(!showModalErrorAddToCart)}
          onErrorMsgCoupon={(msg) => toast.error(msg)}
          isAccordion
          icons={{
            voucher: <img
            src="/images/mdi_ticket-percent.svg"
            alt="icon"
          />,
            points:  <img src="/images/mdi_star-circle.svg" alt="icon" />,
            pointsApplied: <h3 className="order-summary-cart__popup--points-textApllied">{i18n.t("orderSummary.points")}</h3>,
            voucherApplied: <h3 className="order-summary-cart__popup--voucher-textApllied">{i18n.t("orderSummary.voucher")}</h3>,
            close: <FontAwesomeIcon icon={faTimes} height="1em" />,
            expand: <FontAwesomeIcon icon={faChevronUp} color="#F7BE16" className="order-summary-cart_expandButtonIcon" />,
            collapse: <FontAwesomeIcon icon={faChevronDown} color="#F7BE16" className="order-summary-cart_expandButtonIcon" />,
            voucherRemoved: <FontAwesomeIcon icon={faTimes} />
          }}
        />
      </div>

      {showModalErrorAddToCart &&
        <Popup setPopup={setShowModalErrorAddToCart}>
          <div className="cart_errorAddCart">
            <h3 className="cart_errorAddCartTitle">{i18n.t("cart.errorSKUTitle")}</h3>
            <p className="cart_errorAddCartDesc">{i18n.t("cart.errorSKUDetail")} </p>
          </div>
        </Popup>
      }
    </>
  )
}

export default OrderSummaryBox
