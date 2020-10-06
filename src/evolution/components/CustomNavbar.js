import React from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  UncontrolledTooltip,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

function CustomNavbar(props) {
  const [search, setSearch] = React.useState("");
  const [searchList, setSearchList] = React.useState(["Trà Sữa", "Cà Phê", "Cap"]);
  const cartSize = props.items ? Object.keys(props.items).length : 0;

  return (
          <header className="canhcam-header-1">
            <div className="container">
              <div className="row">
                <div className="col-auto">
                  <div className="logo">
                    <div className='Module Module-282'>
                      <div className='ModuleContent'>
                        <Link
                            to="/"
                            id="navbar-brand"
                            style={{fontSize: "1.8em"}}
                        >
                          {/* TheCoffee */}
                          <img
                              style={{
                                display: "block",
                                margin: "auto"
                              }}
                              alt="logo"
                              src={require(`assets/img/logo.png`)}>
                          </img>
                        </Link>
                        <UncontrolledTooltip target="#navbar-brand">
                          Về Trang Chủ
                        </UncontrolledTooltip>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-auto ml-auto">
                  <div className="menu-option-wrap">

                    <div className="menu-tracking menu-out">
                      <a id="nav-hotline" href="tel:19006066">
                        <img
                            style={{
                              display: "block",
                              margin: "auto"
                            }}
                            alt="logo"
                            src={require(`assets/img/hotline.png`)}>
                        </img>
                      </a>
                      <UncontrolledTooltip target="#nav-hotline">
                        Đặt hàng miễn phí
                      </UncontrolledTooltip>
                    </div>

                    <div className="social-list">
                      <Form
                          className="form-inline"
                          action={`/search/${search}`}
                          onSubmit={
                            e => {
                              if (!search)
                                e.preventDefault();
                            }}
                      >
                        <FormGroup>
                          <InputGroup>
                            <Input
                                value={search}
                                placeholder="Bạn cần gì? "
                                type="text"
                                id="search"
                                list="searchList"
                                required
                                onChange={e => setSearch(e.target.value)}
                            >

                            </Input>
                            <InputGroupAddon addonType="append">
                              <InputGroupText onClick={e => {props.onSearch(search)}}>
                                <Link to={`/search/${search}`} id="search-button" onClick={e=>{if (!search)e.preventDefault()}}>
                                  <i className="fa fa-search"></i>
                                  <UncontrolledTooltip target="#search-button">
                                    Tìm kiếm
                                  </UncontrolledTooltip>
                                </Link>

                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Form>
                      <datalist id="searchList">
                        {searchList.map((s, ind) => (
                            <option key={`recently_searched${ind}`}>{s}</option>
                        ))}
                      </datalist>
                    </div>
                    <div className="cart">
                      <Link
                          to="/cart"
                          id="cart-tooltip"
                          style={{
                            "fontSize": "1.5em",
                          }}
                      >

                        <span className="fas fa-shopping-bag"></span>
                        <span className="count">{cartSize}</span>
                      </Link>
                      <UncontrolledTooltip target="#cart-tooltip">
                        Giỏ hàng
                      </UncontrolledTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
  );
}

export default CustomNavbar;
