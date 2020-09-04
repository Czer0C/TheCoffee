import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Nav,
  NavItem

} from 'reactstrap';

function ProductNavbar(props) {
  const currentTab = window.location.pathname;
  return (
    <>
        <Nav className="justify-content-center" role="tablist" tabs>
            <NavItem className="col-md-4">
              <Link
                className={`nav-link`}
                to="/cart"
                style={{borderStyle:"dotted"}}
              >
                <i className="now-ui-icons shopping_cart-simple"></i>
                Cà Phê
              </Link>
            </NavItem>
            <NavItem className="col-md-4">
              <Link
                to="/delivery"
                style={{borderStyle:"dotted"}}
                className={`nav-link`}
              >
                <i className="now-ui-icons shopping_delivery-fast"></i>
                Trà Sữa
              </Link>
            </NavItem>
            <NavItem className="col-md-4">
              <Link
                className={`nav-link active`}
                // to="/checkout"
                style={{borderStyle:"dotted"}}
              >
                <i className="now-ui-icons ui-1_check"></i>
                Sinh Tố
              </Link>
            </NavItem>
          </Nav>
    </>
  )
}

export default ProductNavbar;
