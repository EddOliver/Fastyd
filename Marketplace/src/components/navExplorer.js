import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, CardBody, Input } from 'reactstrap';
import classnames from 'classnames';

const NavExplorer = (props) => {
    const [activeTab, setActiveTab] = useState(0);

    const [activeLink, setActiveLink] = useState("");

    const toogleLink = (link) => {
        setActiveLink(link);
    };

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Nav tabs>
                {
                    props.elements.map((element, index) => (
                        <NavItem key={"nav" + index} >
                            <NavLink
                                className={classnames({ active: activeTab === index })}
                                onClick={() => { toggle(index); }}
                                style={{fontSize: "1.3rem"}}
                            >
                                {
                                    element.memo === undefined ?
                                        <>
                                            Creation
                                        </>
                                        :
                                        <>
                                            Transaction {index}
                                        </>
                                }
                            </NavLink>
                        </NavItem>
                    ))
                }
            </Nav>
            <TabContent activeTab={activeTab}>
                {
                    props.elements.map((element, index) => (
                        <TabPane key={"tab" + index} tabId={index}>
                            <Row md="2">
                                <Col style={{ textAlign: "start" }} sm="6">
                                    <CardBody style={{ fontSize: "1.6rem" }}>
                                        Overview
                                    </CardBody>
                                </Col>
                            </Row>
                            <hr />
                            <Row md="2">
                                <Col style={{ textAlign: "start" }} sm="6">
                                    <CardBody style={{ fontSize: "1.3rem" }}>
                                        Hash
                                    </CardBody>
                                </Col>
                                <Col style={{ textAlign: "end" }} sm="6">
                                    <CardBody style={{ marginLeft:"-80%",fontSize: "1.3rem" }}>
                                        {
                                            element.hash
                                        }
                                    </CardBody>
                                </Col>
                            </Row>
                            <hr />
                            <Row md="2">
                                <Col style={{ textAlign: "start" }} sm="6">
                                    <CardBody style={{ fontSize: "1.3rem" }}>
                                        Transaction Date
                                    </CardBody>
                                </Col>
                                <Col style={{ textAlign: "end" }} sm="6">
                                    <CardBody style={{ fontSize: "1.3rem" }}>
                                        {
                                            element.created_at
                                        }
                                    </CardBody>
                                </Col>
                            </Row>
                            <hr />
                            <Row md="2">
                                <Col style={{ textAlign: "start" }} sm="6">
                                    <CardBody style={{ fontSize: "1.3rem" }}>
                                        Successful
                                    </CardBody>
                                </Col>
                                <Col style={{ textAlign: "end" }} sm="6">
                                    <CardBody style={{ fontSize: "1.3rem" }}>
                                        {
                                            element.successful ?
                                                <div>
                                                    true
                                                </div>
                                                :
                                                <div>
                                                    false
                                                </div>
                                        }
                                    </CardBody>
                                </Col>
                            </Row>
                            <hr />
                            {
                                element.memo_type === "text" &&
                                <Row md="2">
                                    <Col style={{ textAlign: "start" }} sm="6">
                                        <CardBody style={{ fontSize: "1.3rem" }}>
                                            Data
                                        </CardBody>
                                    </Col>
                                    <Col style={{ textAlign: "end" }} sm="6">
                                        <CardBody style={{ fontSize: "1.3rem" }}>
                                            {
                                                element.memo
                                            }
                                        </CardBody>
                                    </Col>
                                </Row>
                            }
                            <Row md="2">
                                <Col style={{ textAlign: "start" }} sm="2">
                                    <CardBody style={{ fontSize: "1.3rem" }}>
                                        Extra info
                                    </CardBody>
                                </Col>
                                <Col style={{marginLeft:"-20%"}} sm="10">
                                    <CardBody style={{width:"140%", fontSize: "1.3rem"}}>
                                        {
                                            <>
                                                <Input style={{fontSize: "1.3rem"}} onChange={(event)=>
                                                {
                                                    toogleLink(event.target.value);  
                                                }} defaultValue="Select" type="select">
                                                    <option disabled>Select</option>
                                                    {
                                                        Object.keys(element["_links"]).map((elements, index) => (
                                                            <option key={index} value={element["_links"][elements]["href"]}>
                                                                {elements}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                                <div>
                                                    Link:
                                                    <a target="_blank" without rel="noreferrer" href={activeLink.replace("{?cursor,limit,order}","")}>
                                                        {activeLink.replace("{?cursor,limit,order}","")}
                                                    </a>
                                                </div>
                                            </>
                                        }
                                    </CardBody>
                                </Col>
                            </Row>
                        </TabPane>
                    ))
                }
            </TabContent>
        </div>
    );
}

export default NavExplorer;