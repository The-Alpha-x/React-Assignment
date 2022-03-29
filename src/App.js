import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import Sizemenu from "./components/Sizemenu";
import Thumbnail from "./components/Thumbnail";
import Sidebar from "./components/Siderbar";
import { ItemActions } from "./redux/actions/ItemActions";
import { Container, Row, Col, Dropdown} from "react-bootstrap";
// import { UncontrolledButtonDropdown, DropdownItem,DropdownMenu,DropdownToggle} from 'reactstrap';

class App extends Component {
  state = {
    items: [],
    filteredItems: [],
    isFiltered: false,
    cart: [],
    orderBy: 'all'
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
          console.log(items.items.data)
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

  orderByCategory = (type) => {
    var sizeArr = [];
    if(type === 'all'){
      sizeArr = this.state.items;
    }else{
      this.state.items.map((item) => {
        if(item.details.type  === type){
          sizeArr.push(item)
        }
      })
    }
    
    this.setState({
      orderBy: type,
      isFiltered: true,
      filteredItems: sizeArr
    });
    console.log(type)
  };

  filterSize = (size) => {
    var sizeArr = [];
    this.state.items.map((item)=>{
      if(item.details.size == size){
        sizeArr.push(item)
      }
    })
    this.setState({
      filteredItems: sizeArr,
      isFiltered: true
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
              
            <p>{this.state.isFiltered === true ? this.state.filteredItems.length : this.state.items.length } item(s) found</p>
            <div class="d-flex justify-content-end" style={{marginRight:"10%"}}>
            
            <Dropdown>Order By {" "}
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {(this.state.orderBy)}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>this.orderByCategory("all")}>All</Dropdown.Item>
              <Dropdown.Item onClick={()=>this.orderByCategory("t-shirt")} >Tshirts</Dropdown.Item>
              <Dropdown.Item onClick={()=>this.orderByCategory("dress shirts")}>Dress Shirts</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> 
                </div>
              
              <Container>
                <Row xs={3} >
                  {this.state.isFiltered === true ? (
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
