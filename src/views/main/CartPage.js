import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  Form,
  FormGroup,
  ButtonGroup,
  Button,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
  DropdownItem,
  DropdownMenu,
  Col,
  Card,
  CardHeader,
  Input,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  ModalBody,
  DropdownToggle,
  Label,
  Table,
  Row,
  CardBody,
} from "reactstrap";

import ExamplesNavbar from '../../components/Navbars/ExamplesNavbar.js';
import DefaultFooter from "components/Footers/DefaultFooter.js";
import HomePageHeader from "components/Headers/HomePageHeader.js";
import TransparentFooter from 'components/Footers/TransparentFooter.js';
import CheckoutNavbar from 'components/Navbars/CheckoutNavbar.js';
import DarkFooter from "components/Footers/DarkFooter.js";
function CartPage(props) {
  const [modalLive, setModalLive] = React.useState(false);  
  const [modalType, setModalType] = React.useState(-1);
  const [items, setItems] = React.useState(JSON.parse(localStorage.getItem("items")));
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [deliveryInfo, setDeliveryInfo] = React.useState(JSON.parse(localStorage.getItem("deliveryInfo")))
  const getTotalPrice = () => {
    if (!items) {
      return 0;
    }
    return items.reduce((sum, curr) => { 
      
      return sum + curr.totalPrice;
    }, 0)
  }

  const updateItemSize = (item, itemID, size) => {
    if (item.size === size) {
      return;
    }

    let temp = items;

    if (size === "M") {
      item.price -= (item.size === "L" ? 5000 : 0);
    }
    else {
      item.price += (item.size === "M" ? 5000 : 0);
    }

    item.size = size;
    item.totalPrice = item.price * item.quantity;

    temp[itemID] = item;
    setItems(temp);
    localStorage.setItem("items", JSON.stringify(temp));
    setTotalPrice(getTotalPrice);
  }

  const updateItemQuantity = (item, itemID, step) => {
    if (item.quantity === 1 && step === -1) {
      return;
    }

    let temp = items;

    item.quantity += step;
    item.totalPrice = item.price * item.quantity;

    temp[itemID] = item;
    setItems(temp);
    localStorage.setItem("items", JSON.stringify(temp));
    setTotalPrice(getTotalPrice);

  }

  const updateTopping = (toppingIndex, itemID, event) => {    
    
    const newItems = items.map((item, index) => {
      if (itemID !== index) return item;
      
      item.topping[toppingIndex].picked = event.target.checked;
      item.price += item.topping[toppingIndex].price * (event.target.checked === true ? 1 : -1);     
      item.totalPrice = item.price * item.quantity;
      
      return { ...item };      
    })
    setItems(newItems);
     localStorage.setItem("items", JSON.stringify(newItems));
    setTotalPrice(getTotalPrice);
  }
  const [totalPrice, setTotalPrice] = React.useState(getTotalPrice());

  const marginLength = [205, 100, -5];
  const setMargin = () => {   
    if (items && items.length > 0 && items.length < 4) {
      setBottomHeight(marginLength[items.length - 1])
    }
  }

  const [bottomHeight, setBottomHeight] = React.useState();

  

  const searchProduct = () => {

  }

  useEffect(() => {
    setMargin();
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

    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };

  }, []);
  
  const updateItemNote = (itemID, event) => {
    
    const newItems = items.map((item, index) => {
      if (itemID !== index) return item;
      item.note = event.target.value;
      return { ...item };
      
    })
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  }

  const confirmModal = () => {
    if (modalType === 0) {
      let temp = items;
      temp.splice(currentItemIndex, 1);
      setMargin();
      setItems(temp);
      localStorage.setItem("items", JSON.stringify(temp));
      setTotalPrice(getTotalPrice);
    }
    else {
      
    }
    
  }

  return (    
    <>
      
      <ExamplesNavbar items={items} onSearch={searchProduct} isHomePage={false}/>
      <div className="wrapper">
      {/* <HomePageHeader/> */}
        <div className="section">
        
        <div>
            {/* <Link
              className="btn-neutral btn btn-info btn-sm pull-left" 
              style={{display:"contents"}}
              to="/index">
                <i class="now-ui-icons arrows-1_minimal-left"></i>
              Quay về trang chủ
            </Link> */}
        
        
        </div>
          
            <Container>
            
                    
                    
            {
            totalPrice > 0 ? 
              
               <Row >
                 <Card 
               className="col-md-12 justify-content-center"
               style={{marginTop:"65px", paddingTop:"30px" ,paddingBottom:"30px", marginBottom:`${bottomHeight}px`}}>
                 
                 <CheckoutNavbar cartSize={items.length} deliveryDone={deliveryInfo ? true : false}/>
                 <CardHeader style={{paddingTop:"35px"}}>
                <center><h3>
                 Thông tin giỏ hàng
               </h3></center>
                </CardHeader>
                 <CardBody>
                 <Table responsive >
                <thead>
                  <tr>
                    <th style={{textAlign: "center"}} colspan="2">Sản Phẩm</th>
                    <th style={{textAlign: "center"}}>Kích cỡ</th>
                    <th style={{textAlign: "center"}}>Topping</th>
                    <th style={{textAlign: "center"}}>Số lượng</th>
                    <th style={{textAlign: "center"}}>Ghi Chú</th>
                    <th style={{textAlign: "center"}}>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    items.map((item, index) => (
                      <tr>
                        <td style={{textAlign: "center"}}>
                          <img
                            alt="..."
                            src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images//${item.productDetail.image}`}
                            height="80px"
                            width="80px"
                          /> 
                          
                        </td>
                        <td style={{textAlign: "center", paddingTop:"32px"}}>
                        {item.productDetail.name}
                        </td>
                        <td  style={{textAlign: "center"}}>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            aria-expanded={false}
                            aria-haspopup={true}
                            caret
                            color="success"
                            data-toggle="dropdown"
                            id="dropdownMenuButton"
                            type="button"
                          >
                            {item.size}
                          </DropdownToggle>
                          <DropdownMenu aria-labelledby="dropdownMenuButton">
                            <DropdownItem onClick={e => {
                                e.preventDefault();
                                updateItemSize(item, index, "M");
                            }}>
                              M
                            </DropdownItem>
                            <DropdownItem onClick={e => {
                                e.preventDefault(); 
                                updateItemSize(item, index, "L");
                              }}>
                              L + 5k
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        </td>
                        <td style={{ paddingLeft: "50px"}}>
                          <FormGroup check>
                          {
                            item.topping ? 
                            item.topping.map((topping, tindex) => (
                              <Row>
                                <Label check>
                                <Input 
                                  defaultValue="" 
                                  type="checkbox" 
                                  checked={topping.picked}
                                  
                                  onChange={e => {updateTopping(tindex, index, e)}}
                                />
                                {topping.value} + {topping.price.toLocaleString()}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                              </Row>
                            )) : 
                            null
                          }
                          </FormGroup>
                         
                          
                        </td>
                        <td style={{paddingTop: "25px"}}>
                          <Pagination
                          className="pagination pagination-success"
                          listClassName="pagination-success"
                          >
                          <PaginationItem className={item.quantity > 1 ? "active" : "disabled"}>
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault(); 
                                updateItemQuantity(item, index, -1);
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
                              {item.quantity}
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem className="active"> 
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault(); 
                                updateItemQuantity(item, index, 1);
                              }}
                            >
                              +
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                        </td>
                        <td style={{textAlign: "center", paddingTop: "25px"}}>
                          <Form onSubmit={e => {e.preventDefault();}}>
                            <Input 
                              value={item.note}
                              onChange={e => updateItemNote(index, e)}
                              placeholder="Ít đường, đá" 
                              type="text"
                              onSubmit={e => {
                                e.preventDefault();
                              }}
                            />
                          </Form>
                        </td>
                        <td style={{textAlign: "center"}}>
                          {item.totalPrice}Đ
                          <button 
                          type="button" 
                          data-placement="right" 
                          id="tooltip11104356" 
                          class="btn btn-neutral"
                          id={`delete_${index}`} 
                            onClick={e => {
                              e.preventDefault();
                              setCurrentItemIndex(index);
                              setModalLive(true);
                              setModalType(0);
                            }}
                          
                          >
                            <i class="now-ui-icons ui-1_simple-remove"></i>
                          </button>
                          <UncontrolledTooltip placement="right" target={`delete_${index}`} delay={0}>
                              Xóa khỏi giỏ hàng
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    ))
                  }                  
                  <tr>
                    <td colspan="2">
                    <Link
                      className="btn btn-round btn-secondary pull-left btn-lg" 
                      to="/"
                    >
                      Quay về
                    </Link>
                    </td>
                    <td></td>
                    <td style={{textAlign: "center", paddingTop:"20px", fontSize:"1.5em"}}>Tổng Tiền</td>
                    <td style={{textAlign: "center", paddingTop:"20px", fontSize:"1.5em"}}>{totalPrice}Đ</td>
                    
                    <td colspan="2">
                      <Link
                        className="btn btn-round btn-info pull-right btn-lg" 
                        to="/delivery">
                        Tiếp theo
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
                 </CardBody>
               </Card>
               </Row> :
                <div style={{textAlign:"center", paddingTop:"210px", paddingBottom:"450px"}}>
                  <h3 >
                    Giỏ hàng của bạn đang trống!
                  </h3>
                  <Link
                    className="btn-round btn btn-lg btn-warning justify-content-end" 
                    to="/">
                    Quay về trang chủ.
                  </Link>
                </div>
              }

              <Modal
                modalClassName="modal-mini modal-danger"
                toggle={() => setModalLive(false)}
                isOpen={modalLive}
              >
                <div className="modal-header justify-content-center">
                  <div className="modal-profile">
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </div>
                </div>
                <ModalBody style={{textAlign: "center"}}>
                  {
                    modalType === 0 ? items[currentItemIndex] ?
                    `Xác nhận xóa sản phẩm ${items[currentItemIndex].productDetail.name}?` : 
                    null:
                    "Xác nhận đặt hàng?"
                  }
                </ModalBody>
                <div className="modal-footer">
                  <Button 
                    className="btn-neutral" 
                    color="link" 
                    type="button"
                    onClick={() => setModalLive(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    className="btn-neutral"
                    color="link"
                    type="button"
                    onClick={() => {
                      setModalLive(false);
                      confirmModal();
                    }}
                  >
                    Xác nhận
                  </Button>
                </div>
              </Modal>
            
                            
              
            
            </Container> 
        </div>
        
        <DefaultFooter/>
        </div>
    </>
  );
}

export default CartPage;
