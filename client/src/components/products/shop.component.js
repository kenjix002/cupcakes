import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Shop extends Component {
    render(){
        return (            
            <div style={{display:"flex"}}>
                <div style={{flex:1}}>
                    add product only for admin
                    <br />
                    Search here
                    <br />
                    price range<br />flavour                    
                </div>
                <div style={{flex:3, border:"1px solid black"}}>
                    lists here SHOP
                    <br />
                    Per item
                    <br />
                    image<br />name<br />price<br />quantity<br />stock remain<br />add cart              
                    <br />
                    can edit(remove in edit)/stocks for admin
                    <br />
                    limit 4 per row?
                    <br />max 5 row? per page
                </div>
            </div>
        )
    }
}