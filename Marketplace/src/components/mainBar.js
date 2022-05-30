import React, { Component } from 'react';
import logo from '../assets/logos.svg';
import { Input, Modal, ModalHeader, Col, ModalBody, ModalFooter, Row, Button } from 'reactstrap';
import shop from "../assets/shop.png"
import reactAutobind from 'react-autobind';
import { connect } from "react-redux"
import { change_page_action, remove_to_cart_action } from "../redux/actions/syncActions/myActions"
const unirest = require('unirest');

class MainBar extends Component {
    constructor(props) {
        super(props);
        reactAutobind(this)
        this.state = {
            location: [],
            cartOpen: false,
            buttonState:false,
        }
    }

    async componentDidMount() {
    
    }

    componentWillUnmount() {

    }

    checkOut() {
        let _this = this
        if (this.props.my_cart.price > 0) {
            unirest('GET', 'XXXXXXXXX/create-checkout-eng')
                .headers({
                    'amount': Math.round((parseInt(this.props.my_cart.price)*0.04986 + Number.EPSILON) * 100) / 100
                })
                .end((res) => {
                    if (res.error) throw new Error(res.error);
                    window.open(JSON.parse(res.raw_body).data.redirect_url)
                    _this.setState({
                        cartOpen: false,
                        buttonState:false
                    })
                });
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.cartOpen} backdrop="static">
                    <ModalHeader>Products</ModalHeader>
                    <ModalBody>
                        <div style={{ overflow: "auto", height: "400px" }}>
                            {
                                this.props.my_cart.cart.map((element, index) => (
                                    <div key={"product"+index} style={{ width: "96%" }}>
                                        <Row md="3">
                                            <Col xs="5">
                                                <div>
                                                    <img
                                                        alt="ok"
                                                        id={index}
                                                        width={100} height={130} src={element.images}></img>
                                                    <div style={{ fontSize: "2rem" }}>
                                                        ${Math.round((parseInt(element.price)*0.04986 + Number.EPSILON) * 100) / 100}
                                                    </div>
                                                    <div style={{ width: "13vw", fontSize: "1rem" }}>
                                                        {element.name}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs="5">
                                                <div style={{ fontSize: "1rem", paddingLeft: "30px", textAlign: "center" }}>
                                                    With this purchase you are directly helping small producers {element.origin}
                                                </div>
                                            </Col>
                                            <Col xs="2">
                                                <div style={{ textAlign: "right" }}>
                                                    <Button onClick={() => this.props.remove_to_cart_action(element)} style={{ width: "100px", height: "60px" }}>Remove from Cart</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <br />
                                    </div>
                                ))
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div style={{ paddingRight: "160px", fontSize: "2rem" }}>
                            ${Math.round((parseInt(this.props.my_cart.price)*0.04986 + Number.EPSILON) * 100) / 100}
                        </div>
                        <Button color="success" onClick={() => {
                            this.props.change_page_action(3)
                            this.setState({
                                cartOpen: false,
                            })
                        }}>Checkout</Button>{' '}
                        <Button color="secondary" onClick={() => {
                            this.setState({
                                cartOpen: false
                            })
                        }}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Row md="3">
                    <Col style={{ marginLeft: "-30px", paddingTop:"14px", textAlign: "left" }} xs="4">
                        <div className="box">
                            <div style={{background:"white", borderRadius:"30px", padding:"10px 16px 10px 16px"}}>
                                <img onClick={() => this.props.change_page_action(0)} src={logo} width="80px" alt="logo" />
                            </div>
                            <>
                                &nbsp;
                                &nbsp;
                            </>
                            <div style={{ paddingTop: "35px" }}>
                                <Input style={{fontSize:"1.3rem", width: '300px' }} onChange={
                                    (event) => {
                                        if (event.target.value === "Online Store") {
                                            this.props.change_page_action(0)
                                        }
                                        else {
                                            this.props.change_page_action(2)
                                        }
                                    }
                                } type="select" name="search" id="search" placeholder="Busca cualquier producto">
                                    <option>Online Store</option>
                                    <option>Provenance Scanner</option>
                                </Input>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ paddingTop: "40px", fontSize: "2rem", color: "white", textAlign: "center" }} xs="4">
                        <>
                            {}
                        </>
                    </Col>
                    <Col style={{ padding: "20px", textAlign: "right" }} xs="4">
                        <>
                            <img onClick={() => {
                                this.setState({
                                    cartOpen: !this.state.cartOpen
                                })
                            }} src={shop} width="80px" alt="logo" />
                        </>
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapDispatchToProps =
{
    change_page_action,
    remove_to_cart_action
}

const mapStateToProps = (state) => {
    return {
        my_cart: state.my_cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBar);