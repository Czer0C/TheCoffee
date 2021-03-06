import React, {useEffect} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Form,
  FormGroup,
  Button,
  UncontrolledDropdown,
  Container,
  UncontrolledTooltip,
  DropdownItem,
  DropdownMenu,
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
  Alert,
  CardBody,
} from "reactstrap";

import CustomNavbar from 'evolution/components/CustomNavbar';
import DefaultFooter from "evolution/components/DefaultFooter.js";
import CheckoutNavbar from 'components/Navbars/CheckoutNavbar.js';
function CartPage(props) {
  const [modalLive, setModalLive] = React.useState(false);  
  const [modalType, setModalType] = React.useState(-1);
  const [items, setItems] = React.useState(JSON.parse(localStorage.getItem("items")));
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [deliveryInfo, setDeliveryInfo] = React.useState(JSON.parse(localStorage.getItem("deliveryInfo")))
  const [alertLive, setAlertLive] = React.useState(false);
  const [removedItem, setRemovedItem] = React.useState("");
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
      setAlertLive(true);
    }
    else {
      
    }
    
  }

  return (    
    <>
      
      <CustomNavbar items={items} onSearch={searchProduct} isHomePage={false}/>
      <div className="wrapper">
        <div className="section">
        <Alert color="warning" isOpen={alertLive} style={{
                  position:"fixed",
                  top: "0px",
                  left: "0px",
                  width: "100%",
                  zIndex:"9999",
                  borderRadius:"0px",
                }}>
          <div className="container text-center">
            
              Đã xóa {removedItem} khỏi giỏ hàng!
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={()=>{
                setAlertLive(false);
              }}
            >
              <span aria-hidden="true">
                <i className="a-close fa fa-times"></i>
              </span>
            </button>
          </div>
        </Alert>
        <div>
                  
        </div>
          
            <Container className="promotion-page">
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
                    <th style={{textAlign: "center"}} colSpan="2">Sản Phẩm</th>
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
                      <tr key={`item_row_${index}`}>
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
                            size="sm"
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
                              <Row key={`topping_${tindex}`}>
                                <Label check>
                                <Input 
                                  defaultValue="" 
                                  type="checkbox" 
                                  checked={topping.picked}
                                  
                                  onChange={e => {updateTopping(tindex, index, e)}}
                                />
                                {topping.value} + {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topping.price)}
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
                              placeholder="VD: ít đường, đá" 
                              type="textarea"
                              onSubmit={e => {
                                e.preventDefault();
                              }}
                            />
                          </Form>
                        </td>
                        <td style={{textAlign: "center"}}>
                          
                          
                          <div style={{marginTop:"15px"}}>

                          {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}

                          <a href="#" onClick={e=>e.preventDefault()}>
                            <i 
                              className="a-delete fa fa-times"
                              style={{paddingLeft:"3px"}}
                              id={`delete_${index}`} 
                              onClick={e => {
                                e.preventDefault();
                                setCurrentItemIndex(index);
                                setModalLive(true);
                                setModalType(0);
                                setRemovedItem(item.productDetail.name);
                            }}
                            />
                          </a>
                          </div>
                          <UncontrolledTooltip placement="right" target={`delete_${index}`} delay={0}>
                              Xóa khỏi giỏ hàng
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    ))
                  }                  
                  <tr>
                    <td colSpan="2">
                    <Link
                      className="btn btn-round btn-secondary pull-left btn-lg" 
                      to="/"
                    >
                      Quay về
                    </Link>
                    </td>
                    <td></td>
                    <td style={{textAlign: "center", paddingTop:"20px", fontSize:"1.5em"}}>Tổng Tiền:</td>
                    <td style={{textAlign: "center", paddingTop:"20px", fontSize:"1.5em"}}>
                      
                      <p className="price-info">
                      {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                      </p>
                    </td>
                    
                    <td colSpan="2">
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
        toggle={() => setModalLive(false)} 
        isOpen={modalLive}>

          <h3 className="modal-header text-center" id="exampleModalLiveLabel" style={{marginBottom:"-15px"}} >
            Xác nhận
          </h3>     
          
          <div className="modal-profile closeDetail">
                    <a href="#" onClick={e=>e.preventDefault()}>
                      <i 
                        className="a-close fa fa-times"
                        onClick={e=>{setModalLive(false); } }
                        style={{fontSize: "2em", marginTop:"40px", marginRight:"8px"}}
                      />
                    </a>
                  </div>
        
        <div className="modal-body text-center" >
          
        <hr></hr>
            <p style={{fontWeight:"500"}}>
              {items[currentItemIndex] ?`Xác nhận xóa sản phẩm ${items[currentItemIndex].productDetail.name} khỏi giỏ hàng?`:""}
              </p>
            
        <hr></hr>
        <div style={{marginTop:"-10px"}}>
        <Button
            color="secondary"
            type="button"
            className="pull-right"
            onClick={() => setModalLive(false)}
          >
            Huỷ
          </Button>
          <Button
            color="warning"
            type="button"
            className=" pull-right"
            onClick={() => {setModalLive(false)
              confirmModal();}}
          >
            Xoá
          </Button>
        </div>
        </div>
        
      </Modal>
              {/* <Modal
                toggle={() => setModalLive(false)}
                isOpen={modalLive}
              >
                <div className="modal-header justify-content-center">
                <a href="#" onClick={e=>e.preventDefault()}>
                      <i 
                        className="fa fa-times" 
                        onClick={e=>{setModalLive(false); } }
                        style={{fontSize: "2em"}}
                      />
                    </a>
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
              </Modal> */}
            
                            
              
            
            </Container> 
        </div>
        
        <DefaultFooter/>
        </div>
    </>
  );
}

export default CartPage;
