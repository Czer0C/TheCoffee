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
  InputGroupText
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import HomePageHeader from "components/Headers/HomePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";


function CartPage() {
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
    <ExamplesNavbar items={items} onSearch={searchProduct}/>
      <div className="wrapper">
      <HomePageHeader />

        <div className="section">
          
            
            <Container>
              </Container>
      </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default CartPage;
