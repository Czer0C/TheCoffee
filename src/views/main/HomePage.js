import React, { useState, useEffect, Component } from 'react';
import {Link} from 'react-router-dom';

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Input,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardDeck,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
  UncontrolledAlert,
  CardColumns
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import HomePageHeader from "components/Headers/HomePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import ProductNavbar from 'components/Navbars/ProductNavbar';


function HomePage(props) {
  const [pills, setPills] = useState(-1);
  const [currentSize, setCurrentSize] = useState("M");
  const [modalLive, setModalLive] = useState(false);  

  const categoriesAPI = 'http://localhost:3001/category';
  const productsAPI = 'http://localhost:3001/products';
  const toppingsAPI = 'http://localhost:3001/topping';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentToppings, setCurrentToppings] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState("");
  const [items, setItems] = React.useState(JSON.parse(localStorage.getItem("items")));
  
  const [addedItem, setAddedItem] = React.useState("");
  const [alertLive, setAlertLive] = React.useState(false);

  const setColMD = () => {

  }
  
  const searchProduct = (dataFromSearchBar) => {
    setCurrentList(products.filter(p => p.name.includes(dataFromSearchBar)));
  }
  useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    if (items) {

    }
    else {
      localStorage.setItem("items", JSON.stringify([]));
    }

    fetch(categoriesAPI)
      .then(response => response.json())
      .then(json => {setCategories(json);});

    fetch(productsAPI)
      .then(response => response.json())
      .then(json => {setProducts(json); setCurrentList(json)});

    fetch(toppingsAPI)
      .then(response => response.json())
      .then(json => {setToppings(json);});

    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };

  }, []);

  return (
    <>
    <ExamplesNavbar 
      items={items} 
      isHomePage={true} 
      onSearch={searchProduct}
    />    
    
      <div className="wrapper">
      
      <HomePageHeader />
        <div className="section">
                <Alert color="success" isOpen={alertLive} style={{
                  position:"fixed",
                  top: "0px",
                  left: "0px",
                  width: "100%",
                  zIndex:"9999",
                  borderRadius:"0px",
                }}>
          <div className="container text-center">
            
                    <strong>{addedItem}</strong> đã được thêm vào giỏ hàng!
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={()=>{
                setAlertLive(false);
              }}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </div>
        </Alert>
          {
            categories.length > 0 ? 
            <Container>
            <Row>  
              
              <Col className="ml-auto mr-auto text-center" md="12">
              <Nav className="justify-content-center" role="tablist" tabs>
            <NavItem className="col-md-4">
            <Button 
              className={`btn-round btn-lg ${pills !== 0 ? "btn-outline-info" : "btn-info"}`}
              style={{width:"inherit"}} 
              onClick={e => {
                e.preventDefault();
                setPills(pills === 0 ? -1 : 0);
                setCurrentList(pills === 0 ? 
                                products : 
                                products.filter(p => p.category === "1")
                              )}}
            
            >
              Cà Phê
            </Button>
            </NavItem>
            <NavItem className="col-md-4">

            <Button 
              className={`btn-round btn-lg ${pills !== 1 ? "btn-outline-info" : "btn-info"}`}
              style={{width:"inherit"}} 
              onClick={e => {
                e.preventDefault();
                setPills(pills === 1 ? -1 : 1);
                setCurrentList(pills === 1 ? 
                                products : 
                                products.filter(p => p.category === "2")
                              )}}
            
            >
              Trà Sữa
            </Button>
            </NavItem>
            <NavItem className="col-md-4">
            <Button 
              className={`btn-round btn-lg ${pills !== 2 ? "btn-outline-info" : "btn-info"}`}
              style={{width:"inherit"}} 
              onClick={e => {
                e.preventDefault();
                setPills(pills === 2 ? -1 : 2);
                setCurrentList(pills === 2 ? 
                                products : 
                                products.filter(p => p.category === "3")
                              )}}
            
            >
              Sinh Tố
            </Button>
            </NavItem>
          </Nav>
                <div className="nav-align-center">
                {/* <Nav className="justify-content-center col-md-12" role="tablist" tabs>
                    {
                      categories.map((item, index) => (                      
                        <NavItem key={`nav_${index}`}>
                          
                        <NavLink
                          href="#"
                          className={pills === index ? "active" : ""} 
                          onClick={(e) => {
                            e.preventDefault();
                            setPills(pills === index ? -1 : index);
                            setCurrentList(pills === index ? 
                                           products : 
                                           products.filter(p => p.category === (index + 1).toString())
                                          )
                          }}
                        >
                          {item.value}
                        </NavLink>
                      </NavItem>
                    ))
                  }
                  </Nav>  */}
                </div>
              </Col>
              <Row>
                
              </Row>
              <TabContent className="gallery" >
              <TabPane >
                <Col className="ml-auto mr-auto text-center">
                  <Row className="collections">                              
                  {
                      currentList.length > 0 ? 
                      currentList.map((product, ind) => (                                  
                        <Col>
                          <Card style={{ width: "15rem" }} >
                            <img
                              alt="..."
                              className="img"
                              src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images//${product.image}`}
                              height="240px"
                              width="320px"
                            ></img>
                            <hr></hr>
                            <CardBody>
                              <CardTitle tag="h4" style={{fontSize:"1.3em", textAlign:"left"}}>{product.name}</CardTitle>
                              <Row>
                                <Col md="9">
                                  <CardText style={{marginTop: "10px", textAlign:"left"}}>
                                    <p style={{fontWeight:"300"}}>{parseFloat(product.price).toLocaleString()}Đ</p>
                                  </CardText>
                                </Col>
                                <Col md="3"> 
                                  <Button
                                    id={`top_${ind}`}
                                    className="btn-round pull-right"
                                    color="info"
                                    href="#pablo"
                                    
                                    onClick={e => {
                                      e.preventDefault(); 
                                      setModalLive(true); 
                                      setCurrentProduct(product); 
                                      
                                      setCurrentPrice(parseInt(product.price));
                                      setTotalPrice(parseInt(product.price));
                                      setCurrentToppings(
                                        product.toppings ? 
                                        toppings.filter(t => product.toppings.includes(t.id)).map(
                                          pt => {
                                            let ct = {}
                                            ct.id = pt.id;
                                            ct.value = pt.value;
                                            ct.price = pt.price;
                                            ct.picked = false;
                                            return ct; 
                                          }
                                        ) : 
                                        []
                                      )
                                    }}
                                  >
                                    +
                                  </Button>
                                  <UncontrolledTooltip placement="right" target={`top_${ind}`} delay={0}>
                                      Thêm vào giỏ hàng
                                  </UncontrolledTooltip>
                                </Col>
                              </Row>    
                            </CardBody>
                          </Card>
                          </Col>
                          )) :
                      null
                    }
                  </Row>
                </Col>
                      
                
                </TabPane>
              </TabContent>
                        
            </Row>
            
            </Container> : 
            <img 
              alt="waiting"
              style={{display:"block",
                      margin:"auto"}} 
              src={require(`assets/img/loading.gif`)}>
            </img>
          }          
           </div>
           
        {
          currentProduct.image ? 
          <Modal className="modal-lg" backdrop="static" toggle={() => setModalLive(false)} isOpen={modalLive}>
        <div className="modal-header">
          <h3 className="modal-title" id="exampleModalLiveLabel" style={{margin: "auto  "}}>
            Đặt Mua
          </h3>     
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => {setModalLive(false); setCurrentSize("M"); setQuantity(1)}}
          >
            <span aria-hidden={true}>X</span>
          </button>
        </div>
        <div className="modal-body"> 
        <hr></hr>    
          <Row>
            <Col md="4">
              <img
                alt="..."
                className="img"
                src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images/${currentProduct.image}`}
                height="240px"
                width="240px"
                style={{margin: "auto", marginTop:"30px"}}
              />
            </Col>

            <Col md="8">
              <Row>
                <h4 style={{margin: "auto", paddingBottom:"30px"}}>{currentProduct.name}</h4>
              </Row>
              <Row style={{margin: "auto"}}>  
              <Col md="3" style={{margin: "auto", padding: "8px"}}>
                      <p style={{fontWeight:"500"}}>Kích cỡ</p>
                    </Col>   
                    <Col md="9">
                    <Button
                          className={`btn-round ${currentSize === "M" ? "btn-info" : "btn-outline-info"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentSize("M");
                            let sizePrice = currentSize === "M" ? 0 : -5000
                            setCurrentPrice(currentPrice + sizePrice);
                            setTotalPrice((currentPrice + sizePrice) * quantity)
                          }}
                        >
                          M
                        </Button>
                        <Button
                            className={`btn-round ${currentSize === "L" ? "btn-info" : "btn-outline-info"}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentSize("L");
                              let sizePrice = currentSize === "L" ? 0 : 5000
                              setCurrentPrice(currentPrice + sizePrice);
                              setTotalPrice((currentPrice + sizePrice) * quantity)
                            }}
                          >
                            L + 5000
                          </Button> 
                  
                    </Col> 
              </Row>
              
              {
                    
                    currentToppings.length === 0 ? 
                    null : 
                    <Row style={{margin: "auto"}}>
              {/* <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills"
                    pills
                    role="tablist"
                  >
                    
                    
                    
                  </Nav> 
                </div>  */}
                <Col md="3" style={{margin: "auto",padding: "8px"}}><p style={{fontWeight:"500"}}>Thêm</p></Col>
                <Col md="9">
                {
                       
                       currentToppings.map((topping, index) => (
                        <Button
                        className={`btn-round ${topping.picked === true ? "btn-info" : "btn-outline-info"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          let temp = currentToppings;
                          temp[index].picked = !temp[index].picked;
                          setCurrentToppings(temp);
                          let toppingValue = (topping.picked ? 1 : -1) * topping.price;
                          setCurrentPrice(currentPrice + toppingValue);
                          setTotalPrice((currentPrice + toppingValue) * quantity);
                        }}
                      >
                        {topping.value} + {topping.price.toLocaleString()}k
                      </Button>
                       )) 
                     }
                </Col>
              </Row>
                
                    
              }

                
              <Row style={{margin: "auto"}}>
              
              <Col md="3" style={{margin: "auto",padding: "8px"}}>
                <p style={{fontWeight:"500"}}>Số lượng</p>              
              </Col>
              <Col md="9" style={{margin: "auto",padding: "8px"}}>
              <Pagination
                className="pagination pagination-info"
                listClassName="pagination-info"
              >
                <PaginationItem className={quantity > 1 ? "active" : "disabled"}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault(); 
                      setQuantity(quantity - 1);
                      setTotalPrice(currentPrice * (quantity - 1))
                    }}
                  >
                    -
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    
                
                  <PaginationLink
                    style={{backgroundColor: "rgba(222, 222, 222, 0.3)"}}
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    {quantity}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="active"> 
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault(); 
                      setQuantity(quantity + 1);
                      setTotalPrice(currentPrice * (quantity + 1))
                    }}
                  >
                    +
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
              </Col>
              </Row>


              <Row style={{margin: "auto"}}>              
                <Col md="3" style={{margin: "auto",padding: "8px"}}>
                  <p style={{fontWeight:"500"}}>Ghi chú</p>              
                </Col>
                <Col md="9" style={{margin: "auto",padding: "8px"}}>
                  <Input 
                    value={note}
                    onChange={e => {setNote(e.target.value)}}
                    placeholder="Ít đường, đá" 
                    type="text"
                  />
                </Col>
              </Row>

              <Row style={{margin: "auto"}}>
              <Col md="3" style={{margin: "auto",padding: "8px"}}>
                <p style={{fontWeight:"500"}}>Tổng tiền</p>              
              </Col>
              <Col md="9" style={{margin: "auto",padding: "8px"}}>
                          <p style={{fontWeight:"500"}}>{totalPrice.toLocaleString()} VNĐ</p>
                </Col>
              </Row>
              
            </Col>
          </Row>
           
          <hr></hr>  
         <div className="text-center">
         <Button
            className="btn-round btn-lg"
            color="secondary"
            type="button"
            onClick={() => {setModalLive(false); setCurrentSize("M"); setQuantity(1)}}
          >
            Hủy
          </Button>
         <Button
            className="btn-round btn-lg"
            color="info"
            type="button"
            onClick={() => {
              setModalLive(false); 
              setCurrentSize("M"); 
              setQuantity(1);
              let currentItem = {
                productDetail: currentProduct,
                size: currentSize,
                topping: currentToppings,
                price: currentPrice,
                quantity: quantity,
                note: note,
                totalPrice: totalPrice
              }
              let temp = [...JSON.parse(localStorage.getItem("items")), currentItem];
              localStorage.setItem("items", JSON.stringify(temp));
              setAddedItem(currentProduct.name);
              setItems(temp);
              setAlertLive(true);
            }}
          >
            Đặt Mua
          </Button>
          
           </div> 
        </div>
        <div className="modal-footer">        
        </div>
      </Modal> :
          null
        }
      
        <DefaultFooter />
      </div>
    </>
  );
}

export default HomePage;
