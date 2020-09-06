import React, { useState, useEffect } from 'react';

// reactstrap components
import {
  Button,
  NavItem,
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
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
  Alert
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import './HomePage.css';

function HomePage(props) {
  const [pills, setPills] = useState(-1);
  const [currentSize, setCurrentSize] = useState("M");
  const [modalLive, setModalLive] = useState(false);  

  const categoriesAPI = 'https://thecoffeebackend.herokuapp.com/category';
  const productsAPI = 'https://thecoffeebackend.herokuapp.com/products';
  const toppingsAPI = 'https://thecoffeebackend.herokuapp.com/topping';

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


  const searchProduct = (dataFromSearchBar) => {
    setCurrentList(products.filter(p => p.name.toLowerCase().includes(dataFromSearchBar.toLowerCase())));
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
      isHomePage={false} 
      onSearch={searchProduct}
    />    
    
      <div className="wrapper">
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
              </Col>
              <Row>
                
              </Row>
              <TabContent className="gallery">
              <TabPane >
                <Col className="ml-auto mr-auto text-center">
                  <Row className="collections">                              
                  {
                      currentList.length > 0 ? 
                      currentList.map((product, ind) => (                                  
                        <Col md={currentList.length>4?3:4} key={`col_product_${ind}`}>
                          <Card style={{ width: "15.9rem" }} >
                            <img
                              alt="..."
                              className="img"
                              src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images//${product.image}`}
                              height="240px"
                              width="320px"
                              style={{marginBottom:"-10px"}}
                            ></img>
                            <hr></hr>
                            <CardBody style={{marginTop:"-50px"}}>
                              <CardTitle tag="h4" style={{fontSize:"1.3em", textAlign:"left", fontWeight:"bold"}}>{product.name}</CardTitle>
                              <Row>
                                <Col md="9">
                                  <CardText style={{textAlign:"left"}}>
                                    <span className="price-info">
                                      {
                                        Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)
                                  
                                      }
                                    </span>
                                  </CardText>
                                </Col>
                                <Col md="3" style={{margin:"auto"}}> 
                                <a href="#" style={{color:"#56b7bb"}} onClick={e=>e.preventDefault()}>
                                <i className="fas fa-shopping-cart fa-2x" 
                                    style={{fontSize:"2em"}}
                                    id={`top_${ind}`}
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
                                ></i>
                                </a>
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
          <Modal 
          className="modal-lg" 
          backdrop="static" 
          toggle={() => {
            setModalLive(false)
            
            setCurrentSize("M"); 
            setQuantity(1); 
            setNote("");
          }} 
          isOpen={modalLive}
          
          >
        <div className="modal-header">
          <h3 className="modal-title" id="exampleModalLiveLabel" style={{margin: "auto  "}}>
            Đặt Mua
          </h3>     
          
          <div className="modal-profile closeDetail">
                    <a href="#" onClick={e=>e.preventDefault()}>
                      <i 
                        className="now-ui-icons ui-1_simple-remove" 
                        onClick={e=>{setModalLive(false); setCurrentSize("M"); setQuantity(1);setNote("")} }
                        style={{fontSize: "2em"}}
                      />
                    </a>
                  </div>
        </div>
        <div className="modal-body" style={{marginTop:"-30px"}}> 
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
                            L + {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(5000)}
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
                        key={`current_topping_${index}`}
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
                        {topping.value} + {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topping.price)}
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
                    type="textarea"
                  />
                </Col>
              </Row>

              <Row style={{margin: "auto"}}>
              <Col md="3" style={{margin: "auto",padding: "8px"}}>
                <p style={{fontWeight:"500", margin:"auto"}}>Tổng tiền</p>              
              </Col>
              <Col md="9" style={{margin: "auto",padding: "8px"}}>
                  <p className="price-info">
                  {
                    Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)
              
                  }
                  </p>

                 
                </Col>
              </Row>
              
            </Col>
          </Row>
           
          <hr></hr>  
         <div className="text-center">
         
         <Button
            className="btn-round btn-lg"
            color="info"
            type="button"
            onClick={() => {
              setModalLive(false); 
              setCurrentSize("M"); 
              setQuantity(1);
              setNote("");
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
