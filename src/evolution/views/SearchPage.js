import React, {useState, useEffect} from 'react';

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
import ExamplesNavbar from 'evolution/components/CustomNavbar';
import DefaultFooter from "evolution/components/DefaultFooter.js";
import './HomePage.css';

function SearchPage(props) {
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

        } else {
            localStorage.setItem("items", JSON.stringify([]));
        }

        fetch(categoriesAPI)
            .then(response => response.json())
            .then(json => {
                setCategories(json);
            });

        fetch(productsAPI)
            .then(response => response.json())
            .then(json => {
                setProducts(json);
                let keyword = props.match.params.search;
                setCurrentList(json.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase())));
            });

        fetch(toppingsAPI)
            .then(response => response.json())
            .then(json => {
                setToppings(json);
            });

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
                        position: "fixed",
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        zIndex: "9999",
                        borderRadius: "0px",
                    }}>
                        <div className="container text-center">

                            <strong>{addedItem}</strong> đã được thêm vào giỏ hàng!
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={() => {
                                    setAlertLive(false);
                                }}
                            >
                              <span aria-hidden="true">
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                              </span>
                            </button>
                        </div>đơn
                    </Alert>
                  {
                    categories.length > 0 ?
                        <Container>
                          <section className="thucdon-1">

                            <div className="menu-content">
                              <div className="row no-gutters">
                                {
                                  currentList.length > 0 ?
                                      currentList.map((product, ind) => (
                                          <div className="col-6 col-md-4 col-lg-6 col-xl-4">
                                            <a className="item btn-buy">
                                              <figure>
                                                <div className="box-img">
                                                  <img src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images//${product.image}`} alt=""/>
                                                </div>
                                                <figcaption>
                                                  <h4>{product.name}</h4>
                                                  <p className="price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                                                  <div className="btn-addcart" onClick={e => {
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
                                                  }}>Thêm vào đơn hàng<span className="lnr lnr-arrow-right"></span>
                                                  </div>
                                                </figcaption>
                                              </figure>
                                            </a>
                                          </div>
                                      )) : null
                                }
                              </div>
                            </div>
                          </section>
                        </Container>
                        :
                        <div className='wait'>
                          <img
                              alt="waiting"
                              style={{display:"flex",
                                margin:"auto"}}
                              src={require(`assets/img/loading.gif`)}>
                          </img>
                        </div>

                  }
                </div>

                {
                    currentProduct.image ?
                        <Modal
                            onEscapeKeyDown={() => alert('test')}
                            className="modal-lg"
                            backdrop="static"
                            toggle={() => {
                                setModalLive(false);
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
                                    <a href="#" onClick={e => e.preventDefault()}>
                                        <i
                                            className="now-ui-icons ui-1_simple-remove"
                                            onClick={e => {
                                                setModalLive(false);
                                                setCurrentSize("M");
                                                setQuantity(1);
                                                setNote("");

                                            }}
                                            style={{fontSize: "2em"}}
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="modal-body" style={{marginTop: "-30px"}}>
                                <hr></hr>
                                <Row>
                                    <Col md="4">
                                        <img
                                            alt="..."
                                            className="img"
                                            src={`https://raw.githubusercontent.com/tnguyen571/thecoffeebackend/master/images/${currentProduct.image}`}
                                            height="240px"
                                            width="240px"
                                            style={{margin: "auto", marginTop: "30px"}}
                                        />
                                    </Col>

                                    <Col md="8">
                                        <Row>
                                            <h4 style={{
                                                margin: "auto",
                                                paddingBottom: "30px"
                                            }}>{currentProduct.name}</h4>
                                        </Row>
                                        <Row style={{margin: "auto"}}>
                                            <Col md="3" style={{margin: "auto", padding: "8px"}}>
                                                <p style={{fontWeight: "500"}}>Kích cỡ</p>
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
                                                    L + {Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(5000)}
                                                </Button>

                                            </Col>
                                        </Row>

                                        {

                                            currentToppings.length === 0 ?
                                                null :
                                                <Row style={{margin: "auto"}}>

                                                    <Col md="3" style={{margin: "auto", padding: "8px"}}><p
                                                        style={{fontWeight: "500"}}>Thêm</p></Col>
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
                                                                    {topping.value} + {Intl.NumberFormat('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND'
                                                                }).format(topping.price)}
                                                                </Button>
                                                            ))
                                                        }
                                                    </Col>
                                                </Row>


                                        }


                                        <Row style={{margin: "auto"}}>

                                            <Col md="3" style={{margin: "auto", padding: "8px"}}>
                                                <p style={{fontWeight: "500"}}>Số lượng</p>
                                            </Col>
                                            <Col md="9" style={{margin: "auto", padding: "8px"}}>
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
                                            <Col md="3" style={{margin: "auto", padding: "8px"}}>
                                                <p style={{fontWeight: "500"}}>Ghi chú</p>
                                            </Col>
                                            <Col md="9" style={{margin: "auto", padding: "8px"}}>
                                                <Input
                                                    value={note}
                                                    onChange={e => {
                                                        setNote(e.target.value)
                                                    }}
                                                    placeholder="Ít đường, đá"
                                                    type="textarea"
                                                />
                                            </Col>
                                        </Row>

                                        <Row style={{margin: "auto"}}>
                                            <Col md="3" style={{margin: "auto", padding: "8px"}}>
                                                <p style={{fontWeight: "500", margin: "auto"}}>Tổng tiền</p>
                                            </Col>
                                            <Col md="9" style={{margin: "auto", padding: "8px"}}>
                  <span className="price-info">
                  {
                      Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(totalPrice)

                  }
                  </span>


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

                <DefaultFooter/>
            </div>
        </>
    );
}

export default SearchPage;
