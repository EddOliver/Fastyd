import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import { Card, Row, Col, Input} from "reactstrap"
import Logo from "../assets/DBlogo.png"
import NavExplorer from "../components/navExplorer"

class Explorer extends Component {
    constructor(props) {
        super(props);
        reactAutobind(this);
        this.unirest = require('unirest');
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        document.body.style.backgroundImage = ""
        document.body.style.backgroundColor = "#16181B"
        this.unirest('GET', 'XXXXXXXXX/get-transactions')
            .headers({
                'account': this.props.match.params.query
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                console.log(JSON.parse(res.raw_body));
                this.setState({
                    data: JSON.parse(res.raw_body)
                });
            });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="rubikFont">
                <div style={{ padding: "3vh", width: "100%", height: "60px", position: "fixed" }}>
                    <div className="box2">
                        <div>
                            <img alt="LogoDB" src={Logo} style={{ width: "10vw" }} />
                        </div>
                        <div>
                            <h5 style={{ padding: "10px 0px 0px 10px", color: "gray", fontSize: "1rem" }}>DigitalBits Explorer (beta)</h5>
                        </div>
                    </div>
                    <hr style={{ background: "gray" }} />
                </div>
                <div style={{ position: "absolute", top: "15vh", width: "100%", height: "85vh", overflowY: "scroll" }}>
                    <br />
                    <Row md="1">
                        <Col xs="12">
                            <div style={{ marginLeft: "20%", width: "60%", color:"white",fontSize: "1.3rem" }}>
                                Search for accounts, transactions and product
                            </div>
                            <Input disabled defaultValue={this.props.match.params.query} style={{fontSize: "1.3rem", marginLeft: "20%", width: "60%" }}>
                            </Input>
                        </Col>
                    </Row>
                    <br />
                    <Row style={{ color: "white", fontSize: "1.3rem" }}>
                        <Col>
                            <div style={{color:"gray",fontSize:"1rem", marginLeft: "20%", width: "60%" }}>
                                Details:
                            </div>
                            <div style={{marginLeft: "20%", width: "60%" }}>
                                Account: {this.props.match.params.query}
                            </div>
                        </Col>
                    </Row>
                    <hr style={{ background: "gray", width: "60%" }} />
                    <Row>
                        <Col>
                            <div style={{ marginLeft: "20%", width: "60%", color: "white" }}>
                                <Card style={{ color: "black" }}>
                                    {
                                        this.state.data.length > 0 &&
                                        <>
                                            <NavExplorer
                                                elements={this.state.data}
                                            />
                                        </>
                                    }
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <br />
                    </Row>
                </div>
            </div>
        );
    }
}

export default Explorer;