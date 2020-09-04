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
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import CheckoutNavbar from 'components/Navbars/CheckoutNavbar.js';
import { getSourceMapRange } from "typescript";

function CheckoutPage() {
  const [pills, setPills] = React.useState("2");
  const [items, setItems] = React.useState(JSON.parse(localStorage.getItem("items")));
  const [deliveryInfo, setDeliveryInfo] = React.useState(JSON.parse(localStorage.getItem("deliveryInfo")));
  const [modalLive, setModalLive] = React.useState(false);
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
                     <center><h3>Chi tiết giỏ hàng</h3></center>
                     </CardTitle>
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
                              <td style={{textAlign: "center", paddingTop:"32px"}}>
                                {item.size}
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
                              </td>
                              <td style={{textAlign: "center", paddingTop:"32px"}}>
                                {item.quantity}
                              </td>
                              <td style={{textAlign: "center", paddingTop:"32px"}}>
                                {item.note}
                              </td>
                              <td style={{textAlign: "center", paddingTop:"32px"}}>
                                {item.price}
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                      <tfoot>
                        <td colSpan="4"></td>
                        <td 
                          style={{
                            textAlign: "center", 
                            paddingTop:"20px", 
                            fontSize:"1.5em"
                        }}>
                          Tổng Tiền
                        </td>
                        <td 
                          style={{
                            textAlign: "center", 
                            paddingTop:"20px", 
                            fontSize:"1.5em"
                        }}>
                          {
                          items.reduce((sum, curr) => { 
                              return sum + curr.totalPrice;
                          }, 0)}Đ
                        </td>
                        <td></td>
                      </tfoot>
                    </Table>
                    <hr></hr>
                      <CardTitle>
                      <center><h3>Thông tin giao hàng</h3></center>
                      </CardTitle>
                      <Form onSubmit={e => e.preventDefault()} >
                          <Row>
                          <Col><FormGroup >
                      <label htmlFor="name">Họ Tên</label>
                      <Input 
                        id="name" 
                        type="text"
                        value={deliveryInfo ? deliveryInfo.name : ""}
                        disabled
                      />
                    </FormGroup></Col>
                    <Col><FormGroup >
                      <label htmlFor="name">Số điện thoại</label>
                      <Input 
                        id="phone" 
                        type="text"
                        value={deliveryInfo ? deliveryInfo.phone : ""}
                        disabled
                      />
                    </FormGroup></Col>
                          </Row>
                    <Row>
                        <Col>
                        <FormGroup>
                      <label htmlFor="name">Địa chỉ</label>
                      <Input 
                        id="address" 
                        type="text"
                        value={deliveryInfo ? deliveryInfo.address : ""}
                        disabled
                      />
                    </FormGroup></Col>
                    <Col>
                    <FormGroup >
                      <label htmlFor="name">Ghi chú</label>
                      <Input 
                        id="note" 
                        type="text"
                        value={deliveryInfo ? deliveryInfo.note : ""}
                        disabled
                      />
                    </FormGroup></Col>
                    </Row>
                  </Form>
                    <hr>
                    </hr> 
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
