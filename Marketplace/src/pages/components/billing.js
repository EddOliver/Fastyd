import React, { Component } from 'react';
import { Row, Col, CardHeader, Card, CardBody } from 'reactstrap';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Fastyd from '../../assets/fastyd2.png';
import VisaMaster from '../../assets/visamaster.png';

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

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
                        Payment Method
                    </h2>
                </span>
                <br />
                <Row md="2">
                    <Col>
                        <Card id="fastyd">
                            <CardHeader
                                onClick={() => {
                                    if (this.state.open === false) {
                                        document.getElementById("fastyd").style.border = "4px solid green"
                                        this.setState({ open: true })
                                        window.open(this.props.billingURL, "Fastyd Checkout", "width=360,height=740");
                                    }
                                }}
                                style={{
                                    fontSize: "1.5rem",
                                }}>
                                Fastyd (For quick payment)
                            </CardHeader>
                            <CardBody
                                onClick={() => {
                                    if (this.state.open === false) {
                                        document.getElementById("fastyd").style.border = "4px solid green"
                                        this.setState({ open: true })
                                        window.open(this.props.billingURL, "Fastyd Checkout", "width=360,height=740");
                                    }
                                }}
                            >
                                <img alt="images" src={Fastyd} style={{
                                    height: "20vh",
                                    maxWidth: "100%",
                                }} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardHeader style={{
                                fontSize: "1.5rem",
                            }}>
                                Card <CreditCardIcon style={{
                                    fontSize: "2rem",
                                }} />
                            </CardHeader>
                            <CardBody>
                                <img alt="images" src={VisaMaster} style={{
                                    height: "20vh",
                                    maxWidth: "100%",
                                }} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Billing;