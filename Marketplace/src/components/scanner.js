import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import { Input, Row, Col, Button, CardBody, CardTitle, CardSubtitle, CardText, Spinner } from 'reactstrap';
import { isMobile } from "react-device-detect"
import reactAutobind from 'react-autobind';
import MyMap from "../components/maps"
import styles from "../assets/style-module"
import { Link } from 'react-router-dom';

const unirest = require('unirest');

class Scanner extends Component {
    constructor(props) {
        super(props);
        reactAutobind(this)
        this.state = {
            cameraId: "environment",
            spaceQR: "ok",
            devices: ["back", "frontal"],
            delay: 200,
            productData: [],
            mapPos: "",
            mapPinsArray: [],
            mapColor: [],
            mapKind: [],
            zoomState: 14,
            digAddress: "",
            loading: false
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    checkDisplay(addr) {
        let _this = this
        unirest('GET', 'XXXXXXXXX/getFromDynamo')
            .headers({
                'account': addr
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                _this.setState({
                    productData: JSON.parse(res.raw_body)
                })
            });
        unirest('GET', 'XXXXXXXXX')
            .headers({
                'req': '/getTransactions',
                'account': addr
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                if (JSON.parse(res.raw_body).length < 2) {
                    console.log("No Data");
                }
                else {
                    let prodTemp = []
                    let pinsArray = []
                    let colorPin = []
                    let mkind = []
                    for (let i = 1; i < JSON.parse(res.raw_body).length; i++) {
                        let temp = JSON.parse(res.raw_body)
                        temp.loc = temp[i].memo.split(",")
                        temp.loc = [parseFloat(temp.loc[1]), parseFloat(temp.loc[0])]
                        prodTemp.push(temp)
                        pinsArray.push(temp.loc)
                        colorPin.push(styles.Solana)
                        mkind.push(0)
                    }
                    _this.setState({
                        mapPos: prodTemp[0].loc,
                        mapPinsArray: pinsArray,
                        mapColorPin: colorPin,
                        mapKind: mkind,
                        digAddress: addr,
                        loading: false
                    })
                }
            });
    }

    handleScan(data) {
        if (data !== null && data !== undefined && this.state.spaceQR !== "none") {
            this.setState({
                spaceQR: "none",
                loading: true
            })
            this.checkDisplay(data)
        }
    }

    handleError(err) {
        // Nothing
    }

    camSelect(event) {
        let temp = "environment"
        if (event.target.value === "frontal") {
            temp = "user"
        }
        this.setState({
            cameraId: temp
        })
    }

    mapPosition(event) {
        let temp = event.target.id.toString()
        this.setState({
            mapPos: this.state.mapPinsArray[temp],
            zoomState: 14
        })
    }

    render() {
        let previewStyle = {
            width: "94%"
        }
        if (isMobile) {
            previewStyle = {
                height: "100%",
                width: "100%"
            }
        }
        return (
            <div className="center" style={{ color: "white", paddingTop: "50px", width: "80%", textAlign: "center" }}>
                <div>
                    Our certificates guarantee that the purchase benefits whoever produces it.
                </div>
                <p></p>
                <Row md="3">
                    <Col>
                        <Input style={{ width: "24vw" }} onChange={this.camSelect} type="select" name="select" id="cameraSelect">
                            {
                                this.state.devices.map((number, index) => <option key={index}>{number}</option>)
                            }
                        </Input>
                        <QrReader
                            delay={this.state.delay}
                            style={previewStyle}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            facingMode={this.state.cameraId}
                        />
                        <div style={{ paddingRight: "10px" }}>
                            <Button style={{ fontSize: "1.5rem" }} onClick={() => {
                                this.setState({
                                    spaceQR: "ok",
                                    productData: [],
                                    mapPos: "",
                                    mapPinsArray: [],
                                    mapColor: [],
                                    mapKind: [],
                                    zoomState: 14,
                                    digAddress: ""
                                })
                            }}>
                                Scan Another Product
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        {
                            this.state.loading && <div style={{ paddingTop: "20vh" }}><Spinner style={{ width: "10vw", height: "10vw" }} size="lg" /></div>
                        }
                        {
                            this.state.productData.length > 0 ?
                                <div>
                                    <div style={{ textAlign: "center" }}>
                                        <img width="50%" src={this.state.productData[0].imagen} alt="id"></img>
                                    </div>
                                    <CardBody>
                                        <CardTitle tag="h5" style={{ color: "white" }}>{this.state.productData[0].nombre}</CardTitle>
                                        <CardSubtitle tag="h5" className="mb-2 text-muted" style={{ color: "white" }}>{this.state.productData[0].marca}</CardSubtitle>
                                        <CardText style={{ color: "white" }}>{this.state.productData[0].procedencia}</CardText>
                                        <CardText style={{ color: "white" }}> {this.state.productData[0].categoria}</CardText>
                                    </CardBody>
                                </div>
                                :
                                <>
                                </>
                        }
                    </Col>
                    <Col>
                        {
                            this.state.mapPinsArray.length > 0 ?
                                <>
                                    <div>DigitalBits Explorer:</div>
                                    <Link
                                        target='_blank'
                                        to={{
                                            pathname: "/dbexplorer/"+this.state.digAddress
                                        }}>
                                        { }{this.state.digAddress.substring(0, 28)}<div></div>{this.state.digAddress.substring(28, this.state.digAddress.length)}
                                    </Link>
                                    <MyMap
                                        coord={this.state.mapPos}
                                        coords={this.state.mapPinsArray}
                                        colors={this.state.mapColor}
                                        kind={[0, 0]}
                                        zoom={this.state.zoomState}
                                    />
                                    {
                                        this.state.mapPinsArray.map((element, index) => (
                                            <div key={index} id={index} onClick={(event) => {
                                                this.mapPosition(event)
                                            }}>
                                                {
                                                    element[0] + "," + element[1]
                                                }
                                            </div>
                                        ))
                                    }
                                </>
                                :
                                <>
                                </>
                        }
                    </Col>
                </Row>


            </div>
        );
    }
}

export default Scanner;