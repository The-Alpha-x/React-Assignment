import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default class Sizemenu extends Component {
  render() {
    return (
      <div>
        <h3>Sizes : </h3>
          <Row sm={6}>
            <Col><button className="sizebutton" onClick={()=>this.props.filterSize("xsmall")}>XS</button></Col>
            <Col><button className="sizebutton" onClick={()=>this.props.filterSize("small")}>S</button></Col>
            <Col><button className="sizebutton" onClick={()=>this.props.filterSize("medium")}>M</button></Col>
            <Col><button className="sizebutton" onClick={()=>this.props.filterSize("mlarge")}>ML</button></Col>
          </Row>
          <Row sm={6}>
            <Col><button className="sizebutton" onClick={()=>this.props.filterSize("large")}>L</button></Col>
            <Col><button className="sizebutton" onClick={()=>this.props.filterSize("xlarge")}>XL</button></Col>
            <Col><button className="sizebutton" onClick={()=>this.props.filterSize("xxlarge")}>XXL</button></Col>
            <Col></Col>
          </Row>  
      </div>
    );
  }
}
