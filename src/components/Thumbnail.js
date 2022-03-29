import React, { Component } from 'react'
import { Button, Row,  Container } from "react-bootstrap";

export default class Thumbnail extends Component {
  
  render() {  
    var decimal =  (this.props.details.price+"").split(".")[1];
    if(decimal === undefined){
      decimal = "00";
    }
    
    return (
      <div style={{marginBottom:5}}>
            <div style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
            {this.props.details.tag != "" ? (
            <p style={{backgroundColor:'black', color:'white', padding: '10px'}} >{this.props.details.tag}</p>
            ) : (<p style={{padding: '20px'}}>  </p>)}
            </div>
            
          <div class="thumbnail" style={{height:500, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <img height={220}
            src= {this.props.details.image}
            alt="new"
            />
          <h5>{this.props.name}</h5>
          <div className="underline">    </div>

          <p>
            $<b style={{fontSize: 25}}>{Math.floor((this.props.details.price).toFixed(2))}.</b>{decimal}
          </p>
          <p>or 9 x $1.21</p>
          <Button style={{width:'100%'}} variant="dark" onClick={()=>this.props.addItemstoCart(this.props.item)}>Add to Cart</Button>         
          
          </div>
      </div>
    )
  }
}
