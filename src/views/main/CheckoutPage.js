import React from "react";
import {Link} from 'react-router-dom'
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Table,
  FormGroup,
  Label,
  Input,
  CardText,
  Modal,
  ModalBody,
  Form,
  UncontrolledTooltip,
  ModalHeader,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import CheckoutNavbar from 'components/Navbars/CheckoutNavbar.js';
import { getSourceMapRange } from "typescript";
import './CheckoutPage.css';
function CheckoutPage() {
  const [pills, setPills] = React.useState("2");
  const [items, setItems] = React.useState(JSON.parse(localStorage.getItem("items")));
  const [currentItem, setCurrentItem] = React.useState(null)
  const [deliveryInfo, setDeliveryInfo] = React.useState(JSON.parse(localStorage.getItem("deliveryInfo")));
  const [modalLive, setModalLive] = React.useState(false);
  const [modalLive2, setModalLive2] = React.useState(false);
  const [status, setStatus] = React.useState(0); // 0: awaiting | 1: success | -1: failed
  const searchProduct = () => {

  }
  const confirmModal = () => {
    
    localStorage.removeItem("items");
    localStorage.removeItem("deliveryInfo");
    setStatus(1)
  }

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar 
      items={items} 
      onSearch={searchProduct}
      isHomePage={false} 
    /> 
      <div className="wrapper">
        <div className="section">
          <Container>
           {
             items && items.length > 0 ? 
             <Row>
               {
                 status === 0 ? 
                 <Card 
                className="col-md-12 justify-content-center" 
                style={{marginTop:"65px", paddingTop:"30px" ,marginBottom:"63px", paddingBottom:"40px"}}
               >
                 <CardTitle>
                  <CheckoutNavbar cartSize={items.length}/>
                  <CardHeader style={{paddingTop:"35px"}}>
                    {/* <center><h3>
                    Xác nhận các thông tin
                  </h3></center> */}
                  </CardHeader>
               
                 </CardTitle>
                 <CardBody>
                   {
                     deliveryInfo ?
                     <><CardTitle>
                     <center><h3>Thông tin đơn hàng</h3></center>
                     </CardTitle>
                   <Table responsive style={{fontSize:"1.3em"}}>
                      <thead>
                        <tr>
                          <th style={{textAlign: "center"}} colspan="2">Sản Phẩm</th>                          
                          <th style={{textAlign: "center"}}>Số lượng</th>
                          <th style={{textAlign: "center"}}>Giá</th>
                          <th style={{textAlign: "center"}}>Chi tiết</th>
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
                              {/* <td style={{textAlign: "center", paddingTop:"32px"}}>
                                {item.size}
                              </td> */}
                              {/* <td style={{ paddingLeft: "50px"}}>
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
                                        disabled
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
                              </td> */}
                              <td style={{textAlign: "center", paddingTop:"32px"}}>
                                {item.quantity}
                              </td>
                              {/* <td style={{textAlign: "center", paddingTop:"32px"}}>
                                {item.note}
                              </td> */}
                              <td style={{textAlign: "center", paddingTop:"32px"}}>
                              {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                              </td>
                              <td style={{textAlign: "center", paddingTop:"32px", fontSize: "1.5em"}}>
                                <i 
                                  class="fas fa-info-circle checkoutInfo" 
                                  id={`info_${index}`}
                                  onClick={e => {
                                    setCurrentItem(item);
                                    setModalLive2(true);
                                  }}
                                />
                                <UncontrolledTooltip placement="bottom" target={`info_${index}`} delay={0}>
                                      Xem chi tiết của sản phẩm này
                                  </UncontrolledTooltip>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                      
                    </Table>
                    <hr></hr>
                      <CardTitle>
                      <center><h3>Thông tin giao hàng</h3></center>
                      </CardTitle>

                      <div style={{fontWeight:500, fontSize:"1.3em"}}>
                      <Row>
                        <Col md="3" className="text-left">
                          Họ Tên: {deliveryInfo.name}
                        </Col>
                        <Col md="4" className="text-left">
                          Số Điện Thoại: {deliveryInfo.phone}
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        
                      </Row>
                      <Row>
                        <Col md="3" className="text-left">
                          Địa Chỉ: {deliveryInfo.address}
                        </Col>
                        <Col md="3" className="text-left">
                          Quận: {deliveryInfo.district}
                        </Col>
                        <Col md="3" className="text-left">
                          Thành Phố: {deliveryInfo.city}
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col className="text-left">
                          Ghi Chú: {deliveryInfo.note}
                        </Col>
                      </Row>
                      </div>
                      
                    <hr>
                    </hr> 
                    <Row style={{fontSize:"1.5em", marginTop:"30px", marginBottom:"60px"}} >
                    <Col className="text-right">
                      Tổng Tiền: 
                    </Col>
                    <Col className="text-left price-info">
                      {
                        
                        Intl.NumberFormat('vi-VN', { 
                          style: 'currency', currency: 'VND' 
                        }).format(
                          items.reduce((sum, curr) => { 
                            return sum + curr.totalPrice;
                          }, 0)
                        )                    
                      }
                    </Col>
                    </Row>
                    <hr></hr>
                <div className="text-center">
                <Link
                  className="btn btn-round btn-secondary pull-left btn-lg" 
                  to="/delivery"
                >
                        Quay về
                      </Link>
                      <Button
                    className="btn-round btn-lg pull-right"
                    color="info"
                    type="button"
                    onClick={() => {setModalLive(true)}}
                  >
                    Xác nhận
                  </Button>
                </div></> : 
                 <div style={{textAlign:"center", paddingTop:"150px", paddingBottom:"150px"}}>
                 <h3 >
                   Bạn chưa nhập thông tin giao hàng
                 </h3>
                 <Link
                   className="btn-round btn btn-lg btn-warning justify-content-end" 
                   to="/delivery">
                   Quay lại
                 </Link>
               </div>
                   }
                 </CardBody>
               </Card> :
               <div className="content text-center">
               <CardBody style={{paddingBottom:"350px"}}>                   
                 <img
                   alt="..."
                   src={require(`assets/img/${status === 1 ? "success.png" : "failed.jpg"}`)}              
                   height="300px"
                   width="300px"
                   style={{padding: "20px"}}
                 />
                 
                 <h3 style={{textAlign:"center"}}>
                   {
                     status === 1 ? "Đặt hàng thành công!" : "Đặt hàng không thành công, xin vui lòng đặt lại hoặc liên hệ CSKH. Xin cảm ơn."
                   }
                 </h3>
                 <Link 
                     className="btn-round btn btn-warning btn-lg btn-block" 
                     to="/">
                     Quay về trang chủ
                   </Link>
               </CardBody>      
                       
             </div> 

              
               } 
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
                className="modal-lg"
                toggle={() => setModalLive2(false)}
                isOpen={modalLive2}
              >
                <div className="modal-header">
                  <div className="modal-profile closeDetail">
                    <a href="#" onClick={e=>e.preventDefault()}>
                      <i 
                        className="now-ui-icons ui-1_simple-remove" 
                        onClick={e=>setModalLive2(false)}
                        style={{fontSize: "2em"}}
                      />
                    </a>
                  </div>
                </div>
                {
                    currentItem ? 
                    <Row>
                <h4 style={{margin:"auto"}}>{currentItem.productDetail.name}</h4>
                
              </Row>
                    : ""
                  }
                  
                <ModalBody style={{textAlign: "center"}}>
                
                  {
                    currentItem ? 
                    <Row>
            <Col md="5">
              <img
                alt="..."
                className="img"
                src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images/${currentItem.productDetail.image}`}
                height="240px"
                width="240px"
                style={{margin: "auto", marginTop:"30px"}}
              />
            </Col>

            <Col md="7">
              <Row>
                <h4 style={{margin: "auto", paddingBottom:"30px"}}>{currentItem.name}</h4>
              </Row>
              <Row >  
                    <Col md="3" className="text-right">
                      <p style={{fontWeight:"500"}}>Kích cỡ:</p>
                    </Col>   
                    <Col md="3" className="text-left">
                        <p style={{fontWeight:"500"}}>{currentItem.size}</p>                      
                    </Col> 
              </Row>
              
              {
                    
                    currentItem.topping.length === 0 ? 
                    null : 
                    <Row style={{ marginTop:"10px",marginBottom:"15px"}}>
            
                <Col md="3" className="text-right"><p style={{fontWeight:"500", marginTop:"10px"}}>Thêm:</p></Col>
                <Col md="9">
                <FormGroup check style={{paddingLeft:"13px"}}>
                {
                       
                       currentItem.topping.map((topping, index) => (
                        <Row>
                          <Label check>
                          <Input 
                            defaultValue="" 
                            type="checkbox" 
                            checked={topping.picked}
                            disabled
                          />
                          {topping.value} + {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topping.price)}
                          <span className="form-check-sign">
                            <span className="check"></span>
                          </span>
                        </Label>
                        </Row>
                       )) 
                     }
                </FormGroup>
                </Col>
              </Row>
              }
              <Row >
              
              <Col md="3" className="text-right">
                <p style={{fontWeight:"500"}}>Số lượng:</p>              
              </Col>
              <Col md="3" className="text-left">
              <p>
            <p style={{fontWeight:"500"}}>{currentItem.quantity}</p>     
                </p>
              </Col>
              </Row>


              <Row >              
                <Col md="3" className="text-right">
                  <p style={{fontWeight:"500"}}>Ghi chú:</p>              
                </Col>
                <Col md="3" className="text-left">
                  <p style={{fontWeight:"500"}}>{currentItem.note}</p>
                </Col>
              </Row>

              <Row>
              <Col md="3" className="text-right">
                <p style={{fontWeight:"500"}}>Tổng tiền:</p>              
              </Col>
              <Col md="3" className="text-left">
                  <p className="price-info">
                  {
                    Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentItem.price)
              
                  }
                  </p>

                 
                </Col>
              </Row>
              
            </Col>
          </Row> : null
                  }
                  <hr></hr>
                  <Button
            className="btn-round btn-lg"
            color="info"
            type="button"
                  onClick={e=>setModalLive2(false)}
            >
              Đóng
            </Button>
                </ModalBody>
                <div className="modal-footer">
                  <Button 
                    className="btn-neutral" 
                    color="link" 
                    type="button"
                    onClick={() => setModalLive2(false)}
                  >
                    Hủy
                  </Button>
                </div>
              </Modal>
               
               <Modal
                modalClassName="modal-mini modal-success"
                toggle={() => setModalLive(false)}
                isOpen={modalLive}
              >
                <div className="modal-header justify-content-center">
                  <div className="modal-profile">
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </div>
                </div>
                <ModalBody style={{textAlign: "center"}}>
                  Xác nhận đặt hàng?
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
        <DefaultFooter />
      </div>
    </>
  );
}

export default CheckoutPage;
