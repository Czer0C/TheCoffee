import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  Form,
  FormGroup,
  Button,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
  Col,
  Input,
  Modal,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert
} from "reactstrap";

function ExamplesNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [modalLive, setModalLive] = React.useState(false);  
  
  const [search, setSearch] = React.useState("");

  const [searchList, setSearchList] = React.useState(["Trà Sữa", "Cà Phê", "Cap"]);
  const cartSize = props.items ? Object.keys(props.items).length : 0;
  const [alert2, setAlert2] = React.useState(false);
  const closeModal = () => {
    setModalLive(false)
  }

  React.useEffect(() => {    
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);

  return (    
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top "} color="info" expand="lg">       
        <Container>
        
          <div className="navbar-translate">
          
            <Link
              className="navbar-brand"
              to="/index"
              id="navbar-brand"
              onClick={e => {}}
            >
              TheCoffee
            </Link>
            <UncontrolledTooltip target="#navbar-brand">
                  Về Trang Chủ
                </UncontrolledTooltip>
              
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              {/* <span style={{
                        color: "#2ca8ff", 
                        background: "#FFFFFF",
                        border: "2px solid #2ca8ff",
                        borderRadius: "19px",
                        display: "inline-block"
                      }}
                    >
                      {cartSize}
                    </span> */}
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
            
          </div>       
          
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >   
          {/* <Alert color="success" isOpen={alert2}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons travel_info"></i>
            </div>
            <strong>Thêm thành công!</strong>
            <button
              type="button"
              className="close"
              onClick={() => setAlert2(false)}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>   */}
            <Nav navbar >           
              <Form 
                className="form-inline ml-auto" 
                data-background-color=""
                onSubmit={
                  e => {
                    e.preventDefault();
                    props.onSearch(search);
                  }
                }>
                <FormGroup className="has-white">
                  <InputGroup>
                  <Input 
                    value={search}
                    placeholder="Bạn cần gì? " 
                    type="text"
                    id="search"
                    list="searchList"
                    onChange={e => setSearch(e.target.value)}
                  >
                      
                  </Input>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_zoom-bold"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Form>
              <datalist id="searchList">
                {searchList.map(s => (
                  <option>{s}</option>
                ))}
              </datalist>
              <NavItem>                          
                <Link
                  to="/cart"
                  id="cart-tooltip"
                  className="nav-link"
                  style={{
                    "fontSize": "1.5em",
                  }}
                  onClick={e => setModalLive(true)}
                >
                  <i className="fa fa-shopping-cart">
                    <span style={{
                        color: "#2ca8ff", 
                        background: "#FFFFFF",
                        border: "2px solid #2ca8ff",
                        borderRadius: "19px",
                        display: "inline-block"
                      }}
                    >
                      {cartSize}
                    </span>
                  </i>
                  <p className="d-lg-none d-xl-none">Cart</p>
                </Link>
                
                <UncontrolledTooltip target="#cart-tooltip">
                  Giỏ hàng
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  id="profile-tooltip"
                  style={{
                    "fontSize": "1.5em",
                  }}
                  onClick={e => e.preventDefault()}
                >
                  <i className="fa fa-user"></i>
                  <p className="d-lg-none d-xl-none">profile</p>
                </NavLink>
                <UncontrolledTooltip target="#profile-tooltip">
                  Tài khoản cá nhân
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
