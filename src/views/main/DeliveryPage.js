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
  CardBody,
  Input,
  Modal,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Tooltip,
  Pagination,
  PaginationItem,
  PaginationLink,
  ButtonDropdown,
  ModalBody,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  DropdownToggle,
  Label,
  Table,
  Row,
} from "reactstrap";

import ExamplesNavbar from '../../components/Navbars/ExamplesNavbar.js';
import HomePageHeader from '../../components/Headers/HomePageHeader.js';
import { updateParenthesizedType, isTaggedTemplateExpression } from "typescript";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import CheckoutNavbar from "components/Navbars/CheckoutNavbar.js";
import ProductNavbar from "components/Navbars/ProductNavbar.js";

function DeliveryPage(props) {
  const [modalLive, setModalLive] = React.useState(false);  
  const [items, setItems] = React.useState(JSON.parse(localStorage.getItem("items")));
  
  const [inputName, setInputName] = React.useState("");
  const [inputPhone, setInputPhone] = React.useState("");
  const [inputAddress, setInputAddress] = React.useState("");
  const [inputNote, setInputNote] = React.useState("");

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [note, setNote] = React.useState("");
  const [deliveryStatus, setDeliveryStatus] = React.useState(0);
  const [deliveryInfo, setDeliveryInfo] = React.useState({});
  const [iconTabs, setIconTabs] = React.useState("1");

  const searchProduct = () => {

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
    
    let savedInfo = JSON.parse(localStorage.getItem("deliveryInfo"));
    if (savedInfo) {
      setName(savedInfo.name);
      setPhone(savedInfo.phone);
      setAddress(savedInfo.address);
      setNote(savedInfo.note);
      setDeliveryInfo(savedInfo);
    }

    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };

  }, []);

  const confirmModal = () => {
    
    localStorage.removeItem("items");
    setItems([]);
  }

  const handleDeliverySubmission = () => {
    if (name && phone && address && note) {
      setModalLive(true);
    }
  }

  return (    
    <>
      <ExamplesNavbar items={items} onSearch={searchProduct} isHomePage={false}/>
      
      <div className="wrapper">
        <div className="section">
                  
           {
              
             deliveryStatus === 0 ?
             <Container>
               {
                 items.length > 0 ?
                 <div>
               <Row>
               <Card 
                className="col-md-12 justify-content-center" 
                style={{marginTop:"65px", paddingTop:"30px" ,marginBottom:"63px", paddingBottom:"40px"}}
               >
                 <CardTitle>
                 <CheckoutNavbar deliveryDone={deliveryInfo.name ? true : false}  cartSize={items.length}/>
                <CardHeader style={{paddingTop:"35px"}}>
                <center><h3>
                 Thông tin cá nhân
               </h3></center>
                </CardHeader>
               
                 </CardTitle>
                 <CardBody>
                 <Form onSubmit={e => e.preventDefault()}>
                 <FormGroup>
                   <label htmlFor="name">Họ Tên</label>
                   <Input 
                     id="name" 
                     placeholder="Họ Tên" 
                     type="text"
                     value={name}
                     required
                     className={inputName}
                     onChange={e => {setName(e.target.value)}}
                     onBlur={e=>{
                       if (name !== "") {
                         setInputName("is-valid")
                       }
                       else {
                         setInputName("is-invalid")
                       }
                     }}
                   />
                    <div class="invalid-feedback" id="name-invalid">
                      Vui lòng nhập vào họ tên
                    </div>
                 </FormGroup>
                 <FormGroup>
                   <label htmlFor="phone">Số Điện Thoại</label>
                   <Input
                     id="phone"
                     placeholder="Số điện thoại"
                     type="number"
                     required
                     value={phone}
                     className={inputPhone}
                     onChange={e => {setPhone(e.target.value)}}
                     onBlur={e=>{
                      if (phone !== "") {
                        setInputPhone("is-valid")
                      }
                      else {
                        setInputPhone("is-invalid")
                      }
                    }}
                   />
                   <div class="invalid-feedback" id="phone-invalid">
                      Vui lòng nhập vào SĐT
                    </div>
                 </FormGroup>
               <div className="form-row">
               <FormGroup className="col-md-9">
                 <label htmlFor="address">Địa Chỉ</label>
                 <Input
                   id="address"
                   placeholder="Địa chỉ"
                   type="text"
                   className={inputAddress}
                   required
                   value={address}
                   onChange={e => {setAddress(e.target.value)}}
                   onBlur={e=>{
                    if (address !== "") {
                      setInputAddress("is-valid")
                    }
                    else {
                      setInputAddress("is-invalid")
                    }
                  }}
                 />
                 <div class="invalid-feedback" id="address-invalid">
                      Vui lòng nhập vào địa chỉ
                    </div>
               </FormGroup>
               
               <FormGroup className="col-md-3">
                 <label htmlFor="district">Quận</label>
                 <UncontrolledDropdown>
                          <DropdownToggle
                            aria-expanded={false}
                            aria-haspopup={true}
                            caret
                            color="success"
                            data-toggle="dropdown"
                            id="dropdownMenuButton"
                            type="button"
                            className="btn-sm"
                          >
                            1
                          </DropdownToggle>
                          <DropdownMenu aria-labelledby="dropdownMenuButton">
                            <DropdownItem onClick={e => {
                                e.preventDefault();
                                // updateItemSize(item, index, "M");
                            }}>
                              1
                            </DropdownItem>
                            <DropdownItem onClick={e => {
                                e.preventDefault(); 
                                // updateItemSize(item, index, "L");
                              }}>
                              2
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
               </FormGroup>
               </div>
               <FormGroup>
                 <label htmlFor="note">Ghi Chú</label>
                 <Input
                   id="note"
                   placeholder="Ít đường, đá..."
                   type="textarea"
                   value={note}
                   className={inputNote}
                   onChange={e => {setNote(e.target.value)}}
                   
                 />
               </FormGroup>            
              
               <Link
               className={`btn btn-round btn-lg btn-info pull-right`} 
                to="/checkout"
              
                onClick={(e) => {
                 if (name && phone && address && note) {
                   let temp = {
                     name: name,
                     phone: phone,
                     address: address,
                     note: note
                   };
                   setDeliveryInfo(temp);
                   localStorage.setItem("deliveryInfo", JSON.stringify(temp))
                  return;
                 }
                 else {
                   if (!name) setInputName("is-invalid");
                   if (!phone) setInputPhone("is-invalid");
                   if (!address) setInputAddress("is-invalid");
                   if (!note) setInputNote("is-invalid");
                  e.preventDefault();
                 }
                  
                }}
                >

              Thanh Toán
              </Link>
               <Link
                className="btn btn-round btn-lg btn-secondary pull-left" 
                to="/cart">
                Quay Lại
              </Link>
              </Form>
              
 
                 </CardBody>
               </Card>
               </Row>
             
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
                   Xác nhận đặt hàng với các thông tin bạn vừa nhập?
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
                 </div>:
                 <div style={{textAlign:"center", paddingTop:"210px", paddingBottom:"450px"}}>
                  <h3 >
                    Giỏ hàng của bạn đang trống!
                  </h3>
                  <Link
                    className="btn-round btn btn-warning btn-lg justify-content-end" 
                    to="/">
                    Quay về trang chủ.
                  </Link>
                </div> 
               }
             
             </Container> :             
            <div className="content">
              <CardBody>                   
                <img
                  alt="..."
                  src={require(`assets/img/${deliveryStatus === 1 ? "success.png" : "failed.jpg"}`)}              
                  style={{padding: "20px"}}
                />
                
                <h3 style={{textAlign:"center"}}>
                  {
                    deliveryStatus === 1 ? "Đặt hàng thành công!" : "Đặt hàng không thành công, xin vui lòng đặt lại hoặc liên hệ CSKH. Xin cảm ơn."
                  }
                </h3>
                <Link 
                    className="btn-round btn btn-warning btn-lg btn-block" 
                    to="/index">
                    Quay về trang chủ
                  </Link>
              </CardBody>      
                      
            </div> 


                  
           }        
        </div>
        
        <DefaultFooter/>
        </div>
          
    </>
  );
}

export default DeliveryPage;
