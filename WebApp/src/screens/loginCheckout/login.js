import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';
import ContextModule from '../../utils/contextModule';
import logo from '../../assets/img/fastyd2.png';
import { ethers } from 'ethers';

function filterJSONarray(array, key, value) {
    try {
        return array.filter(obj => obj[key] === value);
    }
    catch (err) {
        return [];
    }
}

class LoginCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            error: null,
            user: "",//'strange@coinbase.com',
            password: "", //'toortoor1',
            loading: false,
        };
        reactAutobind(this);
        this.axios = require('axios');
    }

    static contextType = ContextModule;

    componentDidMount() {
        const queryString = window.location.search;
        const searchParams = new URLSearchParams(queryString);
        const code = searchParams.get('checkout')
        const total = searchParams.get('total')
        const to = searchParams.get('to')
        this.context.setValue({
            checkout: code,
            total: parseFloat(total),
            ewalletTo: to,
        });
    }

    componentWillUnmount() {

    }

    connect() {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                this.context.setValue({
                    cryptoaddress: accounts[0],
                });
                this.setState({ connect: true })
            })
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
    }

    login() {
        this.setState({ loading: true });
        let config = {
            method: 'get',
            url: '	XXXXXXXXX/Rapyd-Login',
            headers: {
                'user': this.state.user,
                'pass': this.state.password
            }
        };
        this.axios(config)
            .then(async (response) => {
                if (response.data === "Error") {
                    console.log("Error");
                    this.setState({ loading: false });
                }
                else {
                    config = {
                        method: 'get',
                        url: 'XXXXXXXXX/get-account-balance',
                        headers: {
                            'ewallet': response.data
                        }
                    };
                    this.axios(config)
                        .then(async (response) => {
                            let Wallet = new ethers.Wallet(response.data.data.metadata.signature, this.context.value.provider)
                            const myArray = filterJSONarray(response.data.data.accounts, "currency", "USD")
                            if (myArray.length > 0) {
                                this.context.setValue({
                                    balance: myArray[0].balance,
                                    ewallet: response.data.data.id,
                                    cryptowallet: response.data.data.metadata.signature,
                                    cryptoaddress: Wallet,
                                    page: 2,
                                    email: this.state.user,
                                });
                            }
                            else {
                                console.log("No Balance");
                            }
                        })
                        .catch((error) => {
                            this.setState({ loading: false });
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                console.log(error);
            });
    }

    render() {
        return (
            <div className='VerticalandHorizontal'>
                <img src={logo} alt="logo" className="logo" style={{
                    height: '100px',
                    paddingBottom: '20px'
                }} />
                <Card style={{
                    width: '80vw',
                    borderColor: '#d9656c',
                }}>
                    <CardHeader style={{
                        backgroundColor: '#d9656c',
                        color: 'white',
                    }}>
                        <h3>Login to Fastyd</h3>
                    </CardHeader>
                    <CardBody>
                        <Input
                            style={{
                                border: '2px solid #d9656c',
                            }}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={this.state.user}
                            onChange={(e) => this.setState({ user: e.target.value })}
                        />
                        <div style={{ margin: "10px" }} />
                        <Input
                            style={{
                                border: '2px solid #d9656c',
                            }}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                        />
                        <div style={{ margin: "15px" }} />
                        <Row>
                            <Col>
                                <button
                                    disabled={this.state.loading}
                                    className='roundButton'
                                    style={{
                                        width: "100%",
                                    }}
                                    onClick={() => {
                                        this.login()
                                    }
                                    }>
                                    Login
                                </button>
                            </Col>
                            <Col>
                                <button className='roundButton' style={{ width: "100%" }}>
                                    Register
                                </button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default LoginCheckout;