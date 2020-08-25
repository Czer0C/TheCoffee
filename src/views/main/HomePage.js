import React, { useState, useEffect, Component } from 'react';

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
  Alert
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import HomePageHeader from "components/Headers/HomePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";


function HomePage() {
  const [pills, setPills] = useState(-1);
  const [currentSize, setCurrentSize] = useState("M");
  const [modalLive, setModalLive] = useState(false);  

  const categoriesAPI = 'https://349ba12405fe.ngrok.io/category';
  const productsAPI = 'https://349ba12405fe.ngrok.io/products';
  const toppingsAPI = 'https://349ba12405fe.ngrok.io/topping';

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
    <ExamplesNavbar items={items} onSearch={searchProduct} />
    
    
      <div className="wrapper">
      {/* <HomePageHeader /> */}
      
        <div className="section">
          {
            categories.length > 0 ? 
            <Container>
            <Row>  
              <Col className="ml-auto mr-auto" md="12">
                <div className="nav-align-center">
                
                  <Nav
                    className="nav-pills-info nav-pills"
                    pills
                    role="tablist"
                  >
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
                  </Nav> 
                </div>
              </Col>
              <TabContent className="gallery" >
              <TabPane >
                <Col className="ml-auto mr-auto">
                  <Row className="collections">                              
                    {
                      currentList.length > 0 ? 
                      currentList.map((product, ind) => (                                  
                        <Col>
                          <Card style={{ width: "20rem" }}>
                            <img
                              alt="..."
                              className="img-raised"
                              src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images//${product.image}`}
                              height="320px"
                              width="320px"
                            ></img>
                            <CardBody>
                              <CardTitle tag="h4">{product.name}</CardTitle>
                              <Row>
                                <Col>
                                  <CardText style={{marginTop: "10px"}}>
                                    {product.price / 1000}.000 VNĐ
                                  </CardText>
                                </Col>
                                <Col>
                                  <Button
                                    id={`top_${product.id}`}
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
                                  <UncontrolledTooltip placement="right" target={`top_${product.id}`} delay={0}>
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
                className="img-raised"
                src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images/${currentProduct.image}`}
                height="180px"
                width="320px"
                style={{margin: "auto"}}
              />
            </Col>

            <Col md="8">
              <Row>
                <h4 style={{margin: "auto"}}>{currentProduct.name}</h4>
              </Row>
              <Row style={{margin: "auto"}}>  
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills"
                    pills
                    role="tablist"
                  >
                    <Col md="4" style={{margin: "auto", padding: "8px"}}>
                      <p>Kích cỡ</p>
                    </Col>   
                    <Col md="4" style={{margin: "auto",padding: "8px"}}>
                      <NavItem key={`nav_1`}>
                        <NavLink
                          href="#"
                          className={currentSize === "M" ? "active" : ""}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentSize("M");
                            let sizePrice = currentSize === "M" ? 0 : -5000
                            setCurrentPrice(currentPrice + sizePrice);
                            setTotalPrice((currentPrice + sizePrice) * quantity)
                          }}
                        >
                          M
                        </NavLink>
                      </NavItem>
                      </Col> 
                      <Col md="4" style={{margin: "auto",padding: "8px"}}>
                        <NavItem key={`nav_2`}>
                          <NavLink
                            href="#"
                            className={currentSize === "L" ? "active" : ""}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentSize("L");
                              let sizePrice = currentSize === "L" ? 0 : 5000
                              setCurrentPrice(currentPrice + sizePrice);
                              setTotalPrice((currentPrice + sizePrice) * quantity)
                            }}
                          >
                            L + 5k
                          </NavLink>
                        </NavItem>
                      </Col> 
                  </Nav> 
                </div>  
              </Row>
              
              <Row style={{margin: "auto"}}>
              <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills"
                    pills
                    role="tablist"
                  >
                    <Col md="2.5" style={{margin: "auto",padding: "8px"}}><p>Thêm</p></Col>   
                    
                    {
                       
                      currentToppings.map((topping, index) => (
                        <Col md="4.5" style={{margin: "auto",padding: "8px"}}>    
                                           
                          <NavItem key={`topping_${index}`}>
                            <NavLink
                              href="#"
                              className={topping.picked === true ? "active" : ""}
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
                              {topping.value} + {topping.price / 1000}k
                            </NavLink>
                          </NavItem>
                          </Col>
                      )) 
                    }
                    
                  </Nav> 
                </div> 
              </Row>
                
              <Row style={{margin: "auto"}}>
              
              <Col md="3" style={{margin: "auto",padding: "8px"}}>
                <p>Số lượng</p>              
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
                  <p>Ghi chú</p>              
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
                <p>Tổng tiền</p>              
              </Col>
              <Col md="9" style={{margin: "auto",padding: "8px"}}>
                          <p>{totalPrice / 1000}.000 VNĐ</p>
                </Col>
              </Row>
              
            </Col>
          </Row>
           
          <hr></hr>  
          <Button
            className="pull-right"
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
              setItems(temp);
            }}
          >
            Đặt Mua
          </Button>
          <Button
            className="pull-right"
            color="secondary"
            type="button"
            onClick={() => {setModalLive(false); setCurrentSize("M"); setQuantity(1)}}
          >
            Hủy
          </Button>
            
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
