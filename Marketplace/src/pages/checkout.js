import React, { Component } from 'react';
import { Card, Row, Col, CardBody, CardHeader, CardFooter, Button } from 'reactstrap';
import { connect } from "react-redux"
import { change_page_action, remove_to_cart_action } from "../redux/actions/syncActions/myActions"
import Shipping from './components/shipping';
import IotReciever from './components/iot-reciever-aws';
import autoBind from 'react-autobind';
import Billing from './components/billing';
import Confirm from './components/confirm';

const ewallet = "ewallet_4d9eb200a52caf382310cf93e171c05c"

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            process: 0,
            checkout_token: makeid(20),
            selector: 0,
            paid: false, // false
        }
        autoBind(this);
    }

    componentDidMount() {
        console.log(this.props.my_cart.cart)
        let total = 0
        this.props.my_cart.cart.forEach(element => {
            total += Math.round((parseInt(element.price) * 0.04986 + Number.EPSILON) * 100) / 100
        });
        this.setState({
            total: Math.round((total + Number.EPSILON) * 100) / 100
        })
    }

    componentWillUnmount() {

    }

    callback = (data) => {
        let temp = JSON.parse(data[1])
        this.setState({
            process: 2,
            selector: parseInt(temp.method),
            paid: true,
        })
    }

    render() {
        return (
            <div style={{
                paddingTop: '16vh',
            }}>
                <IotReciever callback={this.callback} sub_topics={[`/fastyd/checkout/${this.state.checkout_token}`]} />
                <Row>
                    <Col xs={1}>
                    </Col>
                    <Col xs={7}>
                        <Card>
                            <CardHeader style={{ fontSize: "1.5rem" }}>
                                <span
                                    onClick={() => {
                                        if (this.state.process > 0) {
                                            this.setState({ process: 0 })
                                        }
                                    }}
                                    style={{ color: this.state.process >= 0 ? "black" : "whitesmoke", fontWeight: this.state.process >= 0 ? "bolder" : "normal" }} >
                                    Shipping
                                </span>
                                &nbsp;{" • "}&nbsp;
                                <span style={{ color: this.state.process >= 1 ? "black" : "gray", fontWeight: this.state.process >= 1 ? "bolder" : "normal" }} >Billing</span>
                                &nbsp;{" • "}&nbsp;
                                <span style={{ color: this.state.process >= 2 ? "black" : "gray", fontWeight: this.state.process >= 2 ? "bolder" : "normal" }} >Confirmation</span>
                            </CardHeader>
                            <CardBody>
                                {this.state.process === 0 && <Shipping />}
                                {
                                    this.state.process === 1 && <Billing
                                        billingURL={`https://main.drpx9dtlv6e9m.amplifyapp.com/checkout?checkout=${this.state.checkout_token}&total=${this.state.total}&to=${ewallet}`}
                                    />
                                }
                                {this.state.process === 2 && <Confirm paymentMethod={this.state.selector} orderNumber={this.state.checkout_token} />}
                            </CardBody>
                            <CardFooter style={{
                                textAlign: "right",
                            }}>
                                {
                                    this.state.process === 0 &&
                                    <Button color="success" style={{
                                        fontSize: "1.5rem",
                                    }}
                                        onClick={() => {
                                            this.setState({
                                                process: 1,
                                            })
                                        }}>
                                        Continue to Billing
                                    </Button>
                                }
                                {
                                    this.state.paid &&
                                    <Button color="success" style={{
                                        fontSize: "1.5rem",
                                    }}
                                        onClick={() => {
                                            this.props.change_page_action(0)
                                        }}>
                                        Return to shop
                                    </Button>
                                }
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs={3}>
                        <Card>
                            <CardHeader>
                                <h3>Checkout</h3>
                            </CardHeader>
                            <CardBody style={{
                                height: '400px',
                                overflowY: "scroll",
                                overflowX: "hidden",
                            }}>
                                {
                                    this.props.my_cart.cart.map((element, index) => (
                                        <div key={"product" + index} style={{ width: "96%" }}>
                                            <Row md="2">
                                                <Col xs="4">
                                                    <div style={{
                                                        textAlign: 'center',
                                                        fontSize: '1.5em',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        <img
                                                            alt="ok"
                                                            id={index}
                                                            width={100} height={130} src={element.images}></img>
                                                    </div>
                                                </Col>
                                                <Col xs="8">
                                                    <div style={{
                                                        textAlign: 'center',
                                                        fontSize: '1.5em',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        <div style={{ width: "13vw", textAlign: "left", overflowWrap: "break-word" }}>
                                                            ${Math.round((parseInt(element.price) * 0.04986 + Number.EPSILON) * 100) / 100}
                                                        </div>
                                                        <div style={{ width: "10vw", fontSize: "1rem", textAlign: "left", overflowWrap: "break-word" }}>
                                                            {element.name}
                                                        </div>
                                                        <div style={{ width: "10vw", fontSize: "1rem", textAlign: "left", overflowWrap: "break-word" }}>
                                                            Category: {element.classs}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            {
                                                index !== this.props.my_cart.cart.length - 1 &&
                                                <hr />
                                            }
                                        </div>
                                    ))
                                }
                            </CardBody>
                            <CardFooter>
                                <h3>Total: ${
                                    this.state.total
                                }
                                    <span style={{
                                        color: "green",
                                    }}>
                                        {
                                            this.state.paid && " (Paid)"
                                        }
                                    </span>
                                </h3>

                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs={1}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);