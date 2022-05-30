import React, { Component } from 'react';
import { Card, Row, Col, Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { CardBody, Input, CardHeader } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { connect } from "react-redux"
import '../assets/main.css';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import reactAutobind from 'react-autobind';
import { add_to_cart_action } from "../redux/actions/syncActions/myActions"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
}

function GetSortOrder(prop) {
    return function (a, b) {
        if (parseFloat(a[prop]) > parseFloat(b[prop])) {
            return 1;
        } else if (parseFloat(a[prop]) < parseFloat(b[prop])) {
            return -1;
        }
        return 0;
    }
}

function GetSortOrderMin(prop) {
    return function (a, b) {
        if (parseFloat(a[prop]) < parseFloat(b[prop])) {
            return 1;
        } else if (parseFloat(a[prop]) > parseFloat(b[prop])) {
            return -1;
        }
        return 0;
    }
}

class Products extends Component {
    constructor(props) {
        super(props);
        reactAutobind(this)
        this.state = {
            brands: [],
            products: [],
            categories: [],
            brandDefault: "Brand",
            categoryDefault: "Category",
            brandValue: "Brand",
            categoryValue: "Category",
            modalState: false,
            quantityValue: 1,
            buttonLabel: "Add to Cart",
            stateButton: false,
            modalProduct: {
                "class": "SeedValue",
                "code": "SeedValue",
                "description": "SeedValue",
                "details": "SeedValue",
                "weight": "250.0",
                "images": "https://i.ibb.co/9cLw0y6/image.png",
                "brand": "SeedValue",
                "name": "SeedValue",
                "price": "135.0",
                "origin": "SeedValue",
                "stock": "350.0"
            }
        }
        this.reduxChanges = ""
    }

    componentDidMount() {
        this.reduxChanges = setInterval(() => {
            if (!this.props.search.loading) {
                if (this.props.search.result !== '') {
                    let temp = []
                    let temp2 = []
                    temp.push(this.props.search.result[0].brand)
                    for (let i = 0; i < this.props.search.result.length; i++) {
                        temp.push(this.props.search.result[i].brand)
                    }
                    temp2.push(this.props.search.result[0].classs)
                    for (let i = 0; i < this.props.search.result.length; i++) {
                        temp2.push(this.props.search.result[i].classs)
                    }
                    let uniqueChars = [...new Set(temp)];
                    let uniqueChars2 = [...new Set(temp2)];
                    this.setState({
                        brands: uniqueChars,
                        categories: uniqueChars2,
                        products: this.props.search.result
                    })
                    clearInterval(this.reduxChanges)
                }
            }
        }, 100);
    }

    componentWillUnmount() {

    }

    setupModal(event) {
        this.setState({
            modalState: true,
            modalProduct: this.props.search.result[parseInt(event.target.id)]
        })
    }

    valueAddReduce(event) {
        if (event === "add") {
            this.setState({
                quantityValue: this.state.quantityValue + 1
            })
        }
        else if (event === "reduce") {
            if (this.state.quantityValue > 1) {
                this.setState({
                    quantityValue: this.state.quantityValue - 1
                })
            }
        }
    }

    cartAddRemove() {
        this.props.add_to_cart_action(this.state.modalProduct)
        this.setState({
            buttonLabel: "Added",
            stateButton: true
        })
    }

    closeModal() {
        this.setState({
            modalState: false,
            buttonLabel: "Add to Cart",
            stateButton: false
        })
    }

    addCart(event) {
        this.props.add_to_cart_action(this.props.search.result[parseInt(event)])
    }

    filterByBrand(event) {
        let temp = []
        let temp2 = this.props.search.result
        console.log(temp2)
        for (let i = 0; i < this.props.search.result.length; i++) {
            if (event.target.value === temp2[i]["brand"]) {
                continue
            }
            else {
                temp.push(temp2[i])
            }
        }
        for (let i = 0; i < temp.length; i++) {
            temp2 = arrayRemove(temp2, temp[i])
        }
        this.setState({
            products: temp2,
            brandValue: event.target.value,
            categoryValue:this.state.categoryDefault
        })
    }

    filterByCategory(event) {
        let temp = []
        let temp2 = this.props.search.result
        console.log(temp2)
        for (let i = 0; i < this.props.search.result.length; i++) {
            if (event.target.value === temp2[i]["classs"]) {
                continue
            }
            else {
                temp.push(temp2[i])
            }
        }
        for (let i = 0; i < temp.length; i++) {
            temp2 = arrayRemove(temp2, temp[i])
        }
        this.setState({
            products: temp2,
            brandValue: this.state.brandDefault,
            categoryValue: event.target.value
        })
    }

    sortByMethod(event) {
        if (event.target.value === "Low to High") {
            let temp = this.state.products
            temp = temp.sort(GetSortOrder("price"))
            this.setState({
                products: temp
            })
        }
        else {
            let temp = this.state.products
            temp = temp.sort(GetSortOrderMin("price"))
            this.setState({
                products: temp
            })
        }
    }

    displayAll() {
        this.setState({
            products: this.props.search.result
        })
    }

    render() {
        return (
            <>
                {
                    !this.props.search.loading ?
                        <div style={{ padding:"16vh 0vw 0vw 3vw", width: "96%" }}>
                            <Modal size="lg" isOpen={this.state.modalState}>
                                <ModalHeader style={{ fontSize: "2rem" }}>{this.state.modalProduct.class}</ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col>
                                            <img alt="ok" style={{ margin: "20px" }} width={200} height={260} src={this.state.modalProduct.images}></img>
                                            <div>
                                                {this.state.modalProduct.name}{" "}{parseInt(this.state.modalProduct.weight)}g
                                            </div>
                                            <div>
                                                {this.state.modalProduct.brand}
                                            </div>
                                            <br />
                                            <div>
                                                <div className="box">
                                                    <div style={{ paddingTop: "4px" }}>
                                                        <AddIcon id="add" onClick={() => this.valueAddReduce("add")} />
                                                    </div>
                                                    <div>
                                                        <Input style={{ textAlign: "center", width: "90px" }} value={this.state.quantityValue} type="number" defaultValue={1} />
                                                    </div>
                                                    <div id="reduce" onClick={() => this.valueAddReduce("reduce")} style={{ paddingTop: "4px" }}>
                                                        <RemoveIcon />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                {this.state.modalProduct.description}
                                                <ul style={{ fontSize: "0.8rem" }}>
                                                    {
                                                        this.state.modalProduct.details.split(";").map((element, index) => (
                                                            <li key={index}>{element}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                                                ${Math.round((parseInt(this.state.modalProduct.price)*0.04986 + Number.EPSILON) * 100) / 100}
                                            </div>
                                            <div>
                                                Provenance: {this.state.modalProduct.origin}
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                </ModalBody>
                                <ModalFooter>
                                    <Button disabled={this.state.stateButton} color="success" onClick={this.cartAddRemove}>{this.state.buttonLabel}</Button>{' '}
                                    <Button color="secondary" onClick={this.closeModal}>Close</Button>
                                </ModalFooter>
                            </Modal>
                            <Row md="8" style={{ paddingBottom: "38vh" }}>
                                <Col xs="2">
                                    <div style={{color:"white", fontSize:"1.5rem"}}>Filter by Brand</div>
                                    <Input onChange={this.filterByBrand} value={this.state.brandValue} defaultValue={this.state.brandDefault} type="select" name="select" id="exampleSelect">
                                        <option disabled>Brand</option>
                                        {
                                            this.state.brands.map((element, index) => (
                                                <option key={index}>{element}</option>
                                            ))
                                        }
                                    </Input>
                                    <br />
                                    <br />
                                    <div style={{color:"white", fontSize:"1.5rem"}}>Filter by Category</div>
                                    <Input onChange={this.filterByCategory} value={this.state.categoryValue} defaultValue={this.state.categoryDefault} type="select" name="select" id="exampleSelect">
                                        <option disabled>Category</option>
                                        {
                                            this.state.categories.map((element, index) => (
                                                <option key={index}>{element}</option>
                                            ))
                                        }
                                    </Input>
                                    <br />
                                    <br />
                                    <div style={{color:"white", fontSize:"1.5rem"}}>Sort by Price</div>
                                    <Input onChange={this.sortByMethod} defaultValue="Price" type="select" name="select" id="exampleSelect">
                                        <option disabled>Price</option>
                                        <option>High to Low</option>
                                        <option>Low to High</option>
                                    </Input>
                                    <br />
                                    <br />
                                    <Button color="success" onClick={this.displayAll} style={{ fontSize: "1.4rem", borderRadius: "30px" }}>Show All</Button>
                                </Col>
                                <Col xs="10">
                                    <div style={{ paddingRight: "66vw" }}>
                                        Results for {this.state.busqueda}
                                    </div>
                                    <div>
                                        <Card>
                                            <CardHeader style={{ color: "black" }}>
                                                <div className="box2" style={{ overflowX: "auto" }}>
                                                    {
                                                        this.state.brands.map((element, index) => (
                                                            <div className="brands" style={{ margin: "10px", borderColor: "black", borderWidth: "2px", borderStyle: "solid", borderRadius: "25px" }} key={index}>
                                                                <div style={{ margin: "10px", top: "50%",width:"6vw" }}>
                                                                    {element}
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </CardHeader>
                                            <CardBody style={{ color: "black" }}>
                                                <div className="box2" style={{ padding:"16px",width:"100%",overflowX: "auto" }}>
                                                    {
                                                        this.state.products.map((element, index) => (
                                                            index===this.state.products.length-1 ?
                                                            <div key={index}>
                                                                <img
                                                                    alt="ok"
                                                                    id={index}
                                                                    onClick={this.setupModal} width={100} height={130} src={element.images}></img>
                                                                <div>
                                                                    ${Math.round((parseInt(element.price)*0.04986 + Number.EPSILON) * 100) / 100}
                                                                </div>
                                                                <div style={{ width: "13vw", fontSize: "1rem" }}>
                                                                    {element.name}
                                                                </div>
                                                                <div>
                                                                    <Button color="success" onClick={() => this.addCart(index)} style={{ borderRadius: "30px" }}>Add to Cart</Button>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div style={{borderRight:"1px dashed", borderColor:"#c1c1c1"}} key={index}>
                                                                <img
                                                                    alt="ok"
                                                                    id={index}
                                                                    onClick={this.setupModal} width={100} height={130} src={element.images}></img>
                                                                <div>
                                                                ${Math.round((parseInt(element.price)*0.04986 + Number.EPSILON) * 100) / 100}
                                                                </div>
                                                                <div style={{ width: "13vw", fontSize: "1rem" }}>
                                                                    {element.name}
                                                                </div>
                                                                <div>
                                                                    <Button color="success" onClick={() => this.addCart(index)} style={{ borderRadius: "30px" }}>Add to Cart</Button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        :
                        <div className="center">
                            <Spinner color="primary" />
                        </div>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

const mapDispatchToProps =
{
    add_to_cart_action
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);