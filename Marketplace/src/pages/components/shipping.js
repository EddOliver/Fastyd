import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';

class Shipping extends Component {
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
                        Shipping Information
                    </h2>
                </span>
                <br />
                <Row md="2">
                    <Col>
                        <Input type="text" name="name" id="name" placeholder="First Name" />
                    </Col>
                    <Col>
                        <Input type="text" name="name" id="name" placeholder="Last Name" />
                    </Col>
                </Row>
                <hr />
                <Row md="1">
                    <Col>
                        <Input type="text" name="address line" id="address line" placeholder="Address Line 1" />
                    </Col>
                    <div style={{
                        paddingTop: "1.5rem",
                    }} />
                    <Col>
                        <Input type="text" name="address line" id="address line" placeholder="Address Line 2" />
                    </Col>
                </Row>
                <br />
                <Row md="2">
                    <Col>
                        <Input type="text" name="country" id="country" placeholder="Country" />
                    </Col>
                    <Col>
                        <Input type="text" name="state" id="state" placeholder="State" />
                    </Col>
                </Row>
                <br />
                <Row md="2">
                    <Col>
                        <Input type="text" name="city" id="city" placeholder="City" />
                    </Col>
                    <Col>
                        <Input type="number" name="zip" id="zip" placeholder="Zip" />
                    </Col>
                </Row>
                <br />
                <Row md="1">
                    <Col>
                        <Input type="text" name="phone" id="phone" placeholder="Phone" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Shipping;