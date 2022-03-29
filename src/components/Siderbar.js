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
    console.log(counts)
    this.props.cartItems.map((data)=>{
      const elementsIndex = array.findIndex(
        (element) => data === element.item
      );
      if(elementsIndex == -1){
        let a = {
          item: data,
          quantity: 1
        }
        array.push(a);
      }else {
        array[elementsIndex].quantity = array[elementsIndex].quantity + 1;
      }
      
      total = total + parseFloat(data.details.price);
      
    })
    let unique = array.filter(
      (ele, ind) =>
        ind ===
        array.findIndex(
          (elem) => elem.item === ele.item
        )
    );
    // let unique = array.filter((item, i, ar) => ar.indexOf(item) === i);
    // console.log(unique)
    return (
      <div class="d-flex justify-content-end">
        <Menu customBurgerIcon={ <img src="shopping-cart-icon.jpg" /> }>
  
          <div style={{display: 'flex', justifyContent: 'center'}}>
          
          <h5><img src="shopping-cart-icon.jpg" style={{width:40}}/>Bag</h5>
          </div>
        
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
                                <p style={{fontSize:12,}}><b>
                                {item.item.name}</b>
                                </p>
                                <p style={{fontSize:12}}>
                                Quantity : {item.quantity}
                                </p>
                                
                                </Col>
                                <Col xs={2}>
                                <p style={{fontSize:15, color:"yellow"}}>
                                ${parseFloat(item.item.details.price).toFixed(2)}
                                </p>
                                </Col>
                            </Row>
                            <Row>
                            </Row>
                            <hr style={{color:"black"}}/>
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
            <Col xs={3}><p style={{fontSize:20, color:"yellow"}}>${total.toFixed(2)}</p>
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
