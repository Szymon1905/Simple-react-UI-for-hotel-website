import React, { Fragment, useState, useEffect } from 'react';
import './style.css';
import heart from './Assets/heart.svg';
import logo from './Assets/logo.svg';
import mail from './Assets/mail.svg';
import { useParams } from 'react-router-dom';
import { firestore } from '../data/init';
import { getHotelData } from '../data/HotelDB'; 



const Page = () =>{

    const { hotelName } = useParams();
    const [hotels, setHotels] = useState([]); 

    useEffect(() => {
        const displayHotels = async () => {
            try {
                const hotelsData = await getHotelData();
                setHotels(hotelsData);
            } catch (error) {
                console.log(error);
            }
        };
        displayHotels();
    }, []); 


    return(
        <body>
    <nav class="fixed-navigation">
        <img class="logo" src={logo} alt="Logo"/>   
        <ul class="nav-links">
            <li><a class="nav-link" href="#">Home</a></li>
            <li><a class="nav-link" href="#browse">Browse</a></li>
            <li><a class="nav-link" href="#rent">Rent with us</a></li>
            <li><a class="nav-link" href="#">Sign up</a></li>
            <button class="button primary">Log in</button>
        </ul>
        <button class="button primary hidden">Menu</button>
    </nav>
    <section id="hero" class="grid hero-section">
        {hotels.map((hotel, index) => ( hotel.name === hotelName && (<p key={index} className="hotel-page-title">{hotel.name}</p>)))}
        {hotels.map((hotel, index) => (
        ( hotel.name === hotelName && (
        <div class="hotel-page-image-container" style={{ backgroundImage: `url(${require(`./Assets/${hotel.imageFileName}`)})` }}>
            <p class="chip heart">Add to favourite <img src={heart} alt="Heart"/></p>
        </div>))
        ))}

        <article class="hotel-page-details">
        {hotels.map((hotel, index) => ( hotel.name === hotelName && (<p key={index} className="text-small"> <b>Location:</b> {hotel.city}</p>)))}
        {hotels.map((hotel, index) => ( hotel.name === hotelName && (<p key={index} className="text-small"> <b>Local category:</b> {hotel.stars}</p>)))}
        {hotels.map((hotel, index) => ( hotel.name === hotelName && (<p key={index} className="text-small"> <b>Price:</b> {hotel.price}</p>)))}
        <p class="text-small"><b>Description:</b></p>
        {hotels.map((hotel, index) => ( hotel.name === hotelName && (<p key={index} className="text-small">  {hotel.description_long}</p>)))}
           
            <button class="button contact">Contact<img src={mail} alt="Mail"/></button>
            {hotels.map((hotel, index) => (
            (hotel.name === hotelName && (
                <div class="hero-cards">
                    <div class="hotel-page-image" style={{ backgroundImage: `url(${require(`./Assets/${hotel.imageFileName}`)})` }}></div>
                    <div class="hotel-page-image" style={{ backgroundImage: `url(${require(`./Assets/${hotel.imageFileName}`)})` }}></div>
                </div>
                ))
            ))}
        </article>
       
    </section>
</body>
    )
}

export default Page;