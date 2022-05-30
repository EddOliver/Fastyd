import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

class Confirm extends Component {
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <span style={{
                    textAlign: "left",
                }}>
                    <h2>
                        Order Confirmation
                    </h2>
                </span>
                <br />
                <Card style={{
                    textAlign: "left",
                }}>
                    <CardHeader >
                        <h3 style={{
                            color: "green",
                        }}>
                            Thank you, your order has been placed.
                        </h3>
                        <span style={{
                            textAlign: "left",
                        }}> An email has been sent to you with your order details.</span>
                    </CardHeader>
                    <CardBody>
                        <h3>
                            Order details:
                        </h3>
                        <span style={{
                            paddingLeft: "1rem",
                        }}>
                            Order Id: {" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                }}>
                                {
                                    this.props.orderNumber
                                }
                            </span>
                        </span>
                        <br />
                        <span style={{
                            paddingLeft: "1rem",
                        }}>
                            Payment Method: {" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                }}>
                                {
                                    this.props.paymentMethod === 2 ?
                                        "Ewallet" : "Crypto"
                                }
                            </span>
                        </span>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Confirm;