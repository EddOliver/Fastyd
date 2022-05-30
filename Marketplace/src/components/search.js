import React, { Component } from 'react';
import '../assets/main.css';
import { connect } from "react-redux"
import { change_page_action } from "../redux/actions/syncActions/myActions"
import search_action from "../redux/actions/asyncActions/searchAction"
import Cafe from "../assets/cafe.png"
import Cocoa from "../assets/cocoa.png"
import Miel from "../assets/miel.png"
import Madera from "../assets/madera.png"
import Cara from "../assets/cara.png"
import Herbo from "../assets/herbo.png"
import Obvio from "../assets/obio.png"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            value: ""
        }

    }

    componentDidMount() {

    }


    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{ paddingTop: "100px", color: "white" }}>
                <br></br>
                <div style={{ paddingTop: "100px", WebkitTextStroke: "0.7px black", fontSize: "2.4rem", lineHeight: "40px" }}>
                    Buy authentic, socially responsible and <p />
                    100% organic, blockchain validated products.
                </div>
                <div className="footerElement">
                    <div style={{ fontSize: "1.5rem" }}>
                        Categories
                    </div>
                    <div className="box" style={{ fontSize: "1.5rem" }}>
                        <div onMouseOut={() => document.getElementById("selectorCoffee").style.borderStyle = "none"}
                            onMouseOver={() => document.getElementById("selectorCoffee").style.borderStyle = "solid"}
                            onClick={
                                () => {
                                    this.props.search_action("coffee")
                                    this.props.change_page_action(1)
                                }
                            } style={{ margin: "10px" }}>
                            <img id="selectorCoffee" style={{ borderRadius: "25px 25px 25px 25px", borderWidth: "5px" }} alt="logo" width="180px" src={Cafe}></img>
                            <div>
                                Coffee
                            </div>
                        </div>
                        <div>
                        </div>
                        <div
                            onMouseOut={() => document.getElementById("selectorHoney").style.borderStyle = "none"}
                            onMouseOver={() => document.getElementById("selectorHoney").style.borderStyle = "solid"}
                            onClick={
                                () => {
                                    this.props.search_action("honey")
                                    this.props.change_page_action(1)
                                }
                            } style={{ margin: "10px" }}>
                            <img id="selectorHoney" style={{ borderRadius: "25px 25px 25px 25px", borderWidth: "5px" }} alt="logo" width="180px" src={Miel}></img>
                            <div>
                                Honey
                            </div>
                        </div>
                        <div
                            onMouseOut={() => document.getElementById("selectorChoco").style.borderStyle = "none"}
                            onMouseOver={() => document.getElementById("selectorChoco").style.borderStyle = "solid"}
                            onClick={
                                () => {
                                    this.props.search_action("cacao")
                                    this.props.change_page_action(1)
                                }
                            } style={{ margin: "10px" }}>
                            <img id="selectorChoco" style={{ borderRadius: "25px 25px 25px 25px", borderWidth: "5px" }} alt="logo" width="180px" src={Cocoa}></img>
                            <div>
                                Cacao
                            </div>
                        </div>
                        <div
                            onMouseOut={() => document.getElementById("selectorArt").style.borderStyle = "none"}
                            onMouseOver={() => document.getElementById("selectorArt").style.borderStyle = "solid"}
                            onClick={
                                () => {
                                    this.props.search_action("handicraft")
                                    this.props.change_page_action(1)
                                }
                            } style={{ margin: "10px" }}>
                            <img id="selectorArt" style={{ borderRadius: "25px 25px 25px 25px", borderWidth: "5px" }} alt="logo" width="180px" src={Madera}></img>
                            <div>
                                Handicrafts
                            </div>
                        </div>
                        <div
                            onMouseOut={() => document.getElementById("selectorBeauty").style.borderStyle = "none"}
                            onMouseOver={() => document.getElementById("selectorBeauty").style.borderStyle = "solid"}
                            onClick={
                                () => {
                                    this.props.search_action("beauty")
                                    this.props.change_page_action(1)
                                }
                            } style={{ margin: "10px" }}>
                            <img id="selectorBeauty" style={{ borderRadius: "25px 25px 25px 25px", borderWidth: "5px" }} alt="logo" width="180px" src={Cara}></img>
                            <div style={{ lineHeight: "24px" }}>
                                Beauty
                            </div>
                        </div>
                        <div
                            onMouseOut={() => document.getElementById("selectorHerb").style.borderStyle = "none"}
                            onMouseOver={() => document.getElementById("selectorHerb").style.borderStyle = "solid"}
                            onClick={
                                () => {
                                    this.props.search_action("herbalism")
                                    this.props.change_page_action(1)
                                }
                            } style={{ margin: "10px" }}>
                            <img id="selectorHerb" style={{ borderRadius: "25px 25px 25px 25px", borderWidth: "5px" }} alt="logo" width="180px" src={Herbo}></img>
                            <div style={{ lineHeight: "24px" }}>
                                Herbalism
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <a target="_blank" without rel="noreferrer" href="https://www.obioorganico.com/">
                        <img alt="Obio Logo" src={Obvio} style={{ position: "absolute", left: "5px", bottom: "5px", width: "100px" }}></img>
                    </a>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps =
{
    change_page_action,
    search_action
}

export default connect(null, mapDispatchToProps)(Search);