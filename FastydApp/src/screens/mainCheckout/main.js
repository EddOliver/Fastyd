import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import ContextModule from '../../utils/contextModule';
import IotReciever from './components/iot-reciever-aws';
import logo from '../../assets/img/fastyd2.png';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import polygon from '../../assets/img/polygon.png';
import polygonbn from '../../assets/img/polygonbn.png';
import ethbn from '../../assets/img/ethbn.png';
import eth from '../../assets/img/eth.png';
import { abi } from '../../contract/feedContract';
import checkMark from '../../assets/img/check.png';

const ethers = require('ethers');
const providerMatic = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
const priceFeed = "0x9e8E22abfE33aF566377506E4888670Db72e639C"
let contract = new ethers.Contract(priceFeed, abi(), providerMatic);

function epsilonRound(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

function filterJSONarray(array, key, value) {
    try {
        return array.filter(obj => obj[key] === value);
    }
    catch (err) {
        return [];
    }
}

class MainCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publish: {
                message: '',
                topic: '',
            },
            step: 1, // 1
            option: 0,
            confirm: false,
            loading: false,
            reciept: false,
            id: '',
            convert: 0,
            convert2: 0,
        }
        reactAutobind(this);
        this.axios = require('axios');
    }

    static contextType = ContextModule;

    async componentDidMount() {
        let priceMatic = await contract.getLatestMATICPrice();
        let priceETH = await contract.getLatestETHPrice();
        this.setState({
            convert: parseFloat((priceMatic).toString()) / 100000000,
            convert2: parseFloat((priceETH).toString()) / 100000000,
        });
        var config2 = {
            method: 'get',
            url: `https://deep-index.moralis.io/api/v2/${this.context.value.cryptoaddress.address}/balance?chain=mumbai`,
            headers: {
                'accept': 'application/json',
                'X-API-Key': 'm9N2QaqpjstRatg7qJFFMebq6qrggD1jSpsV0NlnelPOKd4wp3wvGNV5T7xC5kUF'
            }
        };
        this.axios(config2)
            .then((response) => {
                this.context.setValue({ cryptobalance: response.data.balance / 1000000000000000000 });
            })
            .catch((error) => {
                console.log(error);
            });
        var config3 = {
            method: 'get',
            url: `https://deep-index.moralis.io/api/v2/${this.context.value.cryptoaddress.address}/balance?chain=ropsten`,
            headers: {
                'accept': 'application/json',
                'X-API-Key': 'm9N2QaqpjstRatg7qJFFMebq6qrggD1jSpsV0NlnelPOKd4wp3wvGNV5T7xC5kUF'
            }
        };
        this.axios(config3)
            .then((response) => {
                this.context.setValue({ cryptobalance2: response.data.balance / 1000000000000000000 });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateFiatBalance() {
        console.log(this.context.value.ewallet);
        var config1 = {
            method: 'get',
            url: 'XXXXXXXXX/get-account-balance',
            headers: {
                'ewallet': this.context.value.ewallet,
            }
        };
        this.axios(config1)
            .then((response) => {
                const myArray = filterJSONarray(response.data.data.accounts, "currency", "USD")
                if (myArray.length > 0) {
                    this.context.setValue({
                        balance: myArray[0].balance,
                    });
                }
                else {
                    console.log("No Balance");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillUnmount() {

    }

    callbackPublish() {
        this.setState({
            publish: {
                message: '',
                topic: '',
            }
        });
    }

    payFiat() {
        this.setState({
            loading: true,
        })
        this.axios({
            method: 'get',
            url: 'XXXXXXXXX/transfer',
            headers: {
                'ewallets': this.context.value.ewallet,
                'ewalletd': this.context.value.ewalletTo,
                'amount': this.context.value.total.toString(),
                'currency': "USD"
            }
        })
            .then((response) => {
                this.axios({
                    method: 'get',
                    url: 'XXXXXXXXX/transaction-decide',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                })
                    .then(() => {
                        this.setState({
                            loading: false,
                            id: response.data.data.id,
                            reciept: true,
                            publish: {
                                message: `{"id":"${response.data.data.id}","method":"${this.state.step}"}`,
                                topic: `/fastyd/checkout/${this.context.value.checkout}`
                            }
                        })
                    })
                    .catch((error) => {
                        this.setState({
                            loading: false,
                        })
                        console.log(error);
                    });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                })
                console.log(error);
            });
    }

    payCrypto() {
        this.setState({
            loading: true,
        })
        this.axios({
            method: 'get',
            url: 'XXXXXXXXX/send',
            headers: {
                'flag': "0",
                'to': '0xcF2F7040801cfA272D68CD37c8FD7D9fb84D65D8',
                'amount': (this.context.value.total.toFixed(2) / this.state.convert).toString(),
                'privatekey': this.context.value.cryptowallet,
            }
        })
            .then((response) => {
                this.axios({
                    method: 'get',
                    url: 'XXXXXXXXX/transfer',
                    headers: {
                        'ewallets': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                        'ewalletd': this.context.value.ewalletTo,
                        'amount': this.context.value.total.toFixed(2),
                        'currency': "USD"
                    }
                })
                    .then((response) => {
                        this.axios({
                            method: 'get',
                            url: 'XXXXXXXXX/transaction-decide',
                            headers: {
                                'id': response.data.data.id,
                                'status': 'accept'
                            },
                        })
                            .then(() => {
                                this.setState({
                                    loading: false,
                                    id: response.data.data.id,
                                    reciept: true,
                                    publish: {
                                        message: `{"id":"${response.data.data.id}","method":"${this.state.step}"}`,
                                        topic: `/fastyd/checkout/${this.context.value.checkout}`
                                    }
                                })
                            })
                            .catch((error) => {
                                this.setState({
                                    loading: false,
                                })
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        this.setState({
                            loading: false,
                        })
                        console.log(error);
                    });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                })
                console.log(error);
            });
    }

    callback(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                {
                    <IotReciever publish={this.state.publish} callbackPublish={this.callbackPublish} callback={this.callback} sub_topics={[`/fastyd/checkout/${this.context.value.checkout}`]} />
                }
                <div style={{
                    textAlign: 'left',
                }}>
                    <img src={logo} style={{
                        height: '50px',
                        margin: '20px',
                    }} />
                </div>
                <hr></hr>
                {
                    this.state.reciept ?
                        <>
                            <h1>Reciept:</h1>
                            <img src={checkMark} style={{
                                width: '60vw',
                                margin: '20px',
                            }} />
                            <h1>Transaction ID: <br /> <span style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                            }}>{this.state.id}</span></h1>
                            <hr />
                            <h1>Total Paid: <br /><span style={{
                                textAlign: 'center',
                                fontSize: '2rem',
                                fontWeight: 'bolder',
                            }}>
                                $
                                {
                                    this.context.value.total.toFixed(2)
                                }
                                {" "}USD
                            </span></h1>
                            <hr />
                            <h3 style={{
                                margin: '20px',
                            }}>
                                An email has been sent to{" "}
                                <span style={{
                                    fontWeight: 'bold',

                                }}>
                                    {this.context.value.email}
                                </span>
                                {" "} with your recipt.
                            </h3>
                        </>
                        :
                        <>
                            <h3 style={{
                                textAlign: 'left',
                                paddingLeft: '30px',
                            }}> Total </h3>
                            <h3>
                                <span style={{
                                    textAlign: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 'bolder',
                                }}>
                                    $
                                    {
                                        this.context.value.total.toFixed(2)
                                    }
                                    {" "}USD
                                </span>
                            </h3>
                            <hr></hr>
                            <h3 style={{
                                textAlign: 'left',
                                paddingLeft: '30px',
                            }}> Pay With </h3>
                            <Row md={1} style={{
                                margin: '20px',
                            }}>
                                <Col xs={12}>
                                    <button className='roundButton' style={{
                                        fontSize: '1.5rem',
                                        width: '100%',
                                        height: '50px',
                                    }} color="primary" block
                                        onClick={() => {
                                            this.setState({ step: 2, option: 0, confirm: false });
                                        }}
                                    >Pay With Fiat {" "}
                                        <AccountBalanceWalletIcon />
                                    </button>
                                </Col>
                                <div style={{
                                    paddingTop: '20px',
                                }}></div>
                                <Col xs={12}>
                                    <button className='roundButton' style={{
                                        fontSize: '1.5rem',
                                        width: '100%',
                                        height: '50px',
                                    }} color="primary" block
                                        onClick={() => {
                                            this.setState({ step: 3, option: 0, confirm: false });
                                        }}
                                    >Pay With Crypto
                                        <CurrencyBitcoinIcon />
                                        {""}
                                        <img src={polygonbn} style={{
                                            height:"50%"
                                        }} />
                                        {"  "}
                                        <img src={ethbn} style={{
                                            height:"50%"
                                        }} />
                                    </button>
                                </Col>
                                <div style={{
                                    paddingTop: '20px',
                                }}></div>
                            </Row>
                            {
                                this.state.step === 2 &&
                                <>
                                    <hr />
                                    <h3 style={{
                                        textAlign: 'left',
                                        paddingLeft: '30px',
                                    }}>Fiat Options </h3>
                                    <Card style={{
                                        margin: '20px',
                                        backgroundColor: this.state.option === 1 ? '#d9656c' : '#fff',
                                        color: this.state.option === 1 ? '#fff' : '#000',
                                    }}
                                        onClick={() => {
                                            if (this.context.value.total.toFixed(2) <= this.context.value.balance.toFixed(2)) {
                                                this.setState({
                                                    confirm: true,
                                                    option: 1,
                                                });
                                            }
                                        }}>
                                        <CardBody>
                                            <span style={{
                                                fontSize: '1.5rem',
                                                fontWeight: 'bolder',
                                            }}>
                                                Ewallet:
                                                $
                                                {
                                                    this.context.value.balance.toFixed(2)
                                                }
                                                {" "}USD
                                            </span>
                                        </CardBody>
                                    </Card>
                                </>
                            }
                            {
                                this.state.step === 3 &&
                                <>
                                    <hr />
                                    <h3 style={{
                                        textAlign: 'left',
                                        paddingLeft: '30px',
                                        marginBottom: '20px',
                                    }}>
                                        Crypto Options
                                    </h3>
                                    <div style={{
                                        maxHeight: '140px',
                                        overflowY: 'scroll',
                                        overflowX: 'hidden',
                                    }}>
                                        <Card style={{
                                            margin: '20px',
                                            backgroundColor: this.state.option === 1 ? '#d9656c' : '#fff',
                                            color: this.state.option === 1 ? '#fff' : '#000',
                                        }}
                                            onClick={() => {
                                                if (this.context.value.total.toFixed(2) <= epsilonRound(this.context.value.cryptobalance * this.state.convert)) {
                                                    this.setState({
                                                        confirm: true,
                                                        option: 1,
                                                    });
                                                }
                                            }}>
                                            <CardBody>
                                                <span style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 'bolder',
                                                }}>
                                                    {this.context.value.cryptobalance}
                                                    {" "}
                                                    <img src={polygon} style={{
                                                        height: '30px'
                                                    }} />
                                                </span>
                                                <br />
                                                <span style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 'bolder',
                                                }}>
                                                    ~ $
                                                    {
                                                        epsilonRound(this.context.value.cryptobalance * this.state.convert)
                                                    }
                                                    {" "} USD
                                                </span>
                                            </CardBody>
                                        </Card>
                                        <Card style={{
                                            margin: '20px',
                                            backgroundColor: this.state.option === 2 ? '#d9656c' : '#fff',
                                            color: this.state.option === 2 ? '#fff' : '#000',
                                        }}
                                            onClick={() => {
                                                if (this.context.value.total.toFixed(2) <= epsilonRound(this.context.value.cryptobalance2 * this.state.convert2)) {
                                                    this.setState({
                                                        confirm: true,
                                                        option: 2,
                                                    });
                                                }
                                            }}>
                                            <CardBody>
                                                <span style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 'bolder',
                                                }}>
                                                    {this.context.value.cryptobalance2}
                                                    {" "}
                                                    <img src={eth} style={{
                                                        height: '30px'
                                                    }} />
                                                </span>
                                                <br />
                                                <span style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 'bolder',
                                                }}>
                                                    ~ $
                                                    {
                                                        epsilonRound(this.context.value.cryptobalance2 * this.state.convert2)
                                                    }
                                                    {" "} USD
                                                </span>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </>
                            }
                            {
                                this.state.step === 4 &&
                                <>
                                    <hr />
                                    Confirm Payment
                                </>
                            }
                            <Row md={1} style={{
                                margin: '20px',
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                right: '0',
                            }}>
                                <hr />
                                <Col>
                                    <button
                                        disabled={!this.state.confirm || this.state.loading}
                                        className='roundButton' style={{
                                            fontSize: '1.5rem',
                                            width: '100%',
                                            height: '50px',
                                        }} color="primary"
                                        onClick={
                                            () => {
                                                if (this.state.step === 2) {
                                                    this.payFiat();
                                                }
                                                else if (this.state.step === 3) {
                                                    this.payCrypto();
                                                }
                                            }
                                        }
                                    >Continue
                                    </button>
                                </Col>
                            </Row>
                        </>
                }
            </div>
        );
    }
}

export default MainCheckout;