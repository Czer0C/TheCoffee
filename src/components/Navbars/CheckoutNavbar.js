import React from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  NavItem

} from 'reactstrap';
import './CheckoutNavbar.css';

function CheckoutNavbar(props) {
  const currentTab = window.location.pathname;
  return (
    <>
    <Nav className="justify-content-center text-center" role="tablist" tabs>
            <NavItem className="col-md-4">
              <Link
                className={`nav-link ${props.cartSize === 0 ? "disabled" : ""} ${currentTab === "/cart" ? "active" : ""}`}
                to="/cart"
              >
                <i className="now-ui-icons shopping_cart-simple"></i>
                Chi tiết giỏ hàng
              </Link>
            </NavItem>
            <NavItem className="col-md-4">
              <Link
                to="/delivery"
                className={`nav-link ${props.cartSize === 0 ? "disabled" : ""} ${currentTab === "/delivery" ? "active" : ""}`}
              >
                <i className="now-ui-icons shopping_delivery-fast"></i>
                Thông tin giao hàng
              </Link>
            </NavItem>
            <NavItem className="col-md-4">
              <Link
                className={
                  `nav-link ${props.cartSize === 0 ? "disabled" : props.deliveryDone === false ? "disabled" : ""} 
                  ${currentTab === "/checkout" ? "active" : ""}`}
                to="/checkout"
              >
                <i className="now-ui-icons ui-1_check"></i>
                Xác nhận và thanh toán
              </Link>
            </NavItem>
          </Nav>
    </>
  )
}

export default CheckoutNavbar;
