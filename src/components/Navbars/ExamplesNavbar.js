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
  Alert,
  UncontrolledAlert
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
  //console.log(props.newItem);
  React.useEffect(() => {    
    if (props.isHomePage === true) {
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
    }
    else {
      setNavbarColor("");  
    }
    
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
      <Navbar className={"fixed-top " + navbarColor} color="primary" expand="lg">       
        <Container>
        
          <div className="navbar-translate">
          
            <Link
              className="navbar-brand"
              to="/"
              id="navbar-brand"
              style={{fontSize: "1.8em"}}
              onClick={e => {}}
            >
              {/* TheCoffee */}
              <img 
              width="141px"
              height="35px"
              style={{display:"block",
                      margin:"auto"}} 
              src={require(`assets/img/logo.png`)}>
            </img>
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
            <Nav navbar >  
            
            {/* {
              props.newItem !== "" ? 
              <UncontrolledAlert color="success">
    <b>Đã thêm {props.newItem} vào giỏ hàng!</b>
</UncontrolledAlert> : null
            } */}
              <Form 
                className="form-inline ml-auto" 
                data-background-color=""
                
                action={`/search/${search}`}
                onSubmit={
                  e => {
                    if (!search)
                    e.preventDefault();
                    

                  }}
                  >
                <FormGroup className="has-white">
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
                    <InputGroupText onClick={e => props.onSearch(search)}>
                      <Link to={`/search/${search}`} id="search-button">
                      <i className="now-ui-icons ui-1_zoom-bold"></i>
                      </Link>
                      <UncontrolledTooltip target="#search-button">
                  Tìm kiếm
                </UncontrolledTooltip>
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
                        color: "#f96332", 
                        background: "#FFFFFF",
                        border: "2px solid #f96332",
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
              {/* <NavItem>
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
              </NavItem> */}
            </Nav>
          
              
          </Collapse>
          
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
