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
  DropdownToggle,
  Label,
  Table,
  Row,
} from "reactstrap";

import ExamplesNavbar from '../../components/Navbars/ExamplesNavbar.js';
import HomePageHeader from '../../components/Headers/HomePageHeader.js';
import { updateParenthesizedType, isTaggedTemplateExpression } from "typescript";
import DefaultFooter from "components/Footers/DefaultFooter.js";


function DeliveryPage(props) {
  const [modalLive, setModalLive] = React.useState(false);  
  const [items, setItems] = React.useState(JSON.parse(localStorage.getItem("items")));
  
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [note, setNote] = React.useState("");
  const [deliveryStatus, setDeliveryStatus] = React.useState(0);

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

    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };

  }, []);

  const confirmModal = () => {
    setDeliveryStatus(1);
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
      <ExamplesNavbar items={items} onSearch={searchProduct}/>
      <div className="wrapper">
      
        <div className="section">
        
        <div>
          
          </div>
          
           {
              
             deliveryStatus === 0 ?
             <Container>
               {
                 items.length > 0 ?
                 <div>
                   <h2 className="title">Giao Hàng</h2>
               <h3>
                 Thông tin cá nhân
               </h3>
             <Form onSubmit={e => e.preventDefault()}>
               <div className="form-row">
                 <FormGroup className="col-md-6">
                   <label htmlFor="name">Họ Tên</label>
                   <Input 
                     id="name" 
                     placeholder="Họ Tên" 
                     type="text"
                     value={name}
                     required
                     onChange={e => {setName(e.target.value)}}
                   />
                 </FormGroup>
                 <FormGroup className="col-md-6">
                   <label htmlFor="phone">Số Điện Thoại</label>
                   <Input
                     id="phone"
                     placeholder="Số điện thoại"
                     type="number"
                     required
                     value={phone}
                     onChange={e => {setPhone(e.target.value)}}
                   />
                 </FormGroup>
               </div>
               <FormGroup>
                 <label htmlFor="address">Địa Chỉ</label>
                 <Input
                   id="address"
                   placeholder="Địa chỉ"
                   type="text"
                   required
                   value={address}
                   onChange={e => {setAddress(e.target.value)}}
                 />
               </FormGroup>
               <FormGroup>
                 <label htmlFor="note">Ghi Chú</label>
                 <Input
                   id="note"
                   placeholder="Ghi chú"
                   type="text"
                   required
                   value={note}
                   onChange={e => {setNote(e.target.value)}}
                 />
               </FormGroup>            
              
               <Button
                  className="btn btn-info pull-right" 
                  type="submit"
                  onClick={e => {
                  handleDeliverySubmission();
                }}
               >
                 Đặt Hàng
               </Button>
               <Link
                className="btn btn-secondary pull-right" 
                to="/cart">
                Quay Lại
              </Link>
              </Form>
         
 
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
                 <div style={{textAlign:"center"}}>
                  <h3 >
                    Giỏ hàng của bạn đang trống!
                  </h3>
                  <Link
                    className="btn-round btn btn-warning btn-lg justify-content-end" 
                    to="/index">
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
