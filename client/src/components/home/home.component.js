import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./home.css"

const images = [
    process.env.PUBLIC_URL + 'images/background1.jpg',
    process.env.PUBLIC_URL + 'images/background2.jpg',
    process.env.PUBLIC_URL + 'images/background3.jpg',
    process.env.PUBLIC_URL + 'images/background4.jpg'
]

const ImageSlider = props => (
    <div className="" style={{display:"flex"}}>
        {images.map( (image,index) => (
            <div className="home_image_box" key={index}>
                <img className="home_image_each" src={image} alt="" width="1280"/>
            </div>
        ))}
    </div>
)

export default class Home extends Component {
    render(){        
        return (            
            <div>
                <div className="home_image">
                    <h2>Grooveee</h2>
                    <ImageSlider />
                </div>

                <div className="home_about">
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et hendrerit enim. 
                        Praesent iaculis tempus lacinia. Nunc faucibus lacinia odio, tristique faucibus 
                        augue consectetur id. Phasellus tristique, purus et tincidunt semper, felis neque 
                        scelerisque nisl, ac gravida massa nunc at nunc. Duis fringilla vitae mauris vitae
                        cursus. Morbi fermentum quis metus eget pulvinar. Integer convallis, magna nec mollis 
                        maximus, nisi ante blandit libero, eget hendrerit massa nulla et odio. Nulla malesuada 
                        velit eu vestibulum ultrices. Cras fringilla metus ut diam molestie, sit amet aliquet leo fringilla.
                    </p>
                    <br />
                    <p>
                        Etiam ac sodales libero. Fusce non nisl augue. 
                        Vestibulum turpis lorem, ultrices in urna at, congue sodales mi. 
                        Pellentesque mauris ipsum, semper ac mattis quis, vestibulum sit amet arcu. 
                        Maecenas mattis iaculis metus, sit amet volutpat neque elementum sollicitudin. 
                        In sagittis tortor massa, pharetra ultrices quam tempus id. Suspendisse vulputate 
                        risus sit amet libero volutpat, ac tempus ipsum tempor. Pellentesque vel sapien id justo efficitur cursus. 
                        Vestibulum at lectus ac eros aliquam efficitur quis ac enim.
                    </p>
                    <div className="home_about_product">
                        <Link to="/products" className="home_about_product_btn">To Shopping!</Link>
                    </div>
                </div>

                <div className="home_contact">
                    <h2>Contact Us</h2>
                    <div className="home_contact_body">
                        <div>
                            <h5>Address:</h5>
                            <p>4 Jalan Tandang 46050</p>
                            <p>Petaling Jaya, Selangor</p>
                            <p>Malaysia</p>
                        </div>                        
                        <div>
                            <h5>Email:</h5>
                            <p>cupcake.shop@cupcake.com</p>                            
                            <h5>Contact Number / Whatsapp:</h5> 
                            <p>03-83456789</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}