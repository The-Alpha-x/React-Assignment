import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import "../Sidebar.css";
import { Container, Row, Col, Button } from "react-bootstrap";

export default class Sidebar extends Component {

  render() {
    var array = [];
    var uniqueArray = [];
    var total = 0.00;
    const counts = {};
    for (const num of this.props.cartItems) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    this.props.cartItems.map((data)=>{
      let a = {
        item: data,
        quantity: counts[data]
      }
      total = total + parseFloat(data.details.price);
      array.push(a);
    })
    let unique = array.filter((item, i, ar) => ar.indexOf(item) === i);
    console.log(total)
    return (
      <div class="d-flex justify-content-end">
        <Menu>
          {unique.length != 0 ? (
            unique.map((item) => {
              return (
                <div style={{ marginBottom: 10 }}>
                        <Container style={{ maxWidth: "100%", marginTop:50 }}>
                            <Row>
                                <Col xs={3}>
                                <img height={60}
                                src= {item.item.details.image}
                                alt="new"
                                />
                                </Col>
                                <Col xs={7}>
                                <p style={{fontSize:12}}>
                                {item.item.name}
                                </p>
                                <p style={{fontSize:12}}>
                                Quantity : {item.quantity}
                                </p>
                                
                                </Col>
                                <Col xs={2}>
                                <p style={{fontSize:15, color:"yellow"}}>
                                ${item.item.details.price}
                                </p>
                                </Col>
                            </Row>
                            <Row>
                            </Row>
                        </Container>

                </div>
              );
            })
          ) : (
            <div></div>
          )}
          <Container style={{ maxWidth: "100%"}}>
          <Row>
            <Col xs={9} ><p>SUBTOTAL</p>
            </Col>
            <Col xs={3}><p style={{fontSize:20, color:"yellow"}}>${total}</p>
            </Col>
          </Row>
          </Container>
          <Row>
          <div  style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <Button style={{width:'90%'}} variant="dark" >CHECKOUT</Button>
          </div>
          </Row>
          
        </Menu>
      </div>
    );
  }
}
