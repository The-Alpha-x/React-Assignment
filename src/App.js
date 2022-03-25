import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import Sizemenu from "./components/Sizemenu";
import Thumbnail from "./components/Thumbnail";
import Sidebar from "./components/Siderbar";
import { ItemActions } from "./redux/actions/ItemActions";
import { Container, Row, Col, Dropdown} from "react-bootstrap";

class App extends Component {
  state = {
    items: null,
    filteredItems: [],
    cart: [],
  };

  componentDidMount() {
    this.getAllItems();
  }

  getAllItems = () => {
    this.props.getAllItems().then((items) => {
      if (items.items) {
        if (items.items.status === 200) {
          this.setState({
            items: items.items.data,
            loading: false,
          });
        }
      }
    });
  };

  addItemstoCart = (item) => {
    var cartArr = this.state.cart
    const isInArray = cartArr.includes(item);
    
    // if(isInArray === false){
      // let a = {
      //   item: item,
      //   quantity: 1
      // };
      cartArr.push(item)
    // }
    this.setState({
      cart: cartArr
    });
  };

  filterSize = (size) => {
    var sizeArr = [];
    this.state.items.map((item)=>{
      if(item.details.size == size){
        sizeArr.push(item)
      }
    })
    this.setState({
      filteredItems: sizeArr
    });
  };

  render() {
    
    const options = [
      'one', 'two', 'three'
    ];
    return (
      <div>
        <Container style={{ maxWidth: "100%" }}>
        <div class="d-flex justify-content-end">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} cartItems={this.state.cart}/>
        </div><br/>
        
          <Row sm={12} style={{marginTop:100}}>
            <Col xs={3}>
              <Sizemenu 
              filterSize = {this.filterSize}
              />
            </Col>
            <Col xs={9}>
            <div class="d-flex justify-content-end" style={{marginRight:"20%"}}>
            <Dropdown options={options} onChange={this._onSelect} placeholder="Select an option" />;
                </div>
              <Container>
                <Row xs={3} >
                  {this.state.filteredItems.length !== 0 ? (
                    this.state.filteredItems.map((item) => {
                      return (
                        <div style={{marginBottom:10}}>
                          <Thumbnail 
                          name={item.name}
                          details={item.details}
                          item={item}
                          addItemstoCart={this.addItemstoCart}
                        />
                        </div>
                        
                      );
                    })
                  ) : this.state.items ? (
                    this.state.items.map((item) => {
                      return (
                        <div style={{marginBottom:10}}>
                          <Thumbnail 
                          name={item.name}
                          details={item.details}
                          item={item}
                          addItemstoCart={this.addItemstoCart}
                        />
                        </div>
                        
                      );
                    }) ) : (
                    <div />
                  )}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const actionCreators = {
  getAllItems: ItemActions.getAllItems,
};

export default connect(null, actionCreators)(App);
