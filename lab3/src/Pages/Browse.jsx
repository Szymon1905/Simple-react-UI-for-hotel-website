import React from 'react';
import './style.css';
import heart from './Assets/heart.svg';
import arrow from './Assets/Arrow.svg';
import logo from './Assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, logout } from '../data/loginService';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../data/init';
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
//import { firestore } from '../data/init'; 
import { getHotelData } from '../data/HotelDB'; 


const Browse = () =>{
    const user = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [setError] = useState(null);
    //const [showLoginOptions, setShowLoginOptions] = useState(false);
    const [hotels, setHotels] = useState([]); 
    const [selectedHotel, setSelectedHotel] = useState(null);

    
    
    const Logout = async () => {
        await logout(); 
    };  

    const GoogleLogin = async (re) => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account",
        });
        var signinobject = signInWithPopup(auth, provider)
        .then((re) => {
            const userDisplayName = re.user.displayName;
            window.alert(`Zalogowano jako ${userDisplayName}`);
            console.log("Zalogowano jako:", userDisplayName);
            console.log(re);            
        })
        .catch((err) => alert(err.message));
        return signinobject;
    };

    const EmailLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    const EmailRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };


    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const hotelsData = await getHotelData();
                setHotels(hotelsData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHotels();
    }, []); 

    const handleViewOffer = (hotelName) => {
        setSelectedHotel(hotelName);
    };
    
    
    return(
        <body>
            <nav class="fixed-navigation">
                <img class="logo" src={logo} alt="Logo"/>
                <ul class="nav-links">
                    <li><a class="nav-link" href="#">Home</a></li>
                    <li><a class="nav-link" href="#browse">Find offers</a></li>
                    <li><a class="nav-link" href="#">Add new offers</a></li>
                    <li><a class="nav-link" href="#">My offers</a></li>
                    <li><a class="nav-link" href="#">Favorites</a></li>
                    {user ? (
                        <>
                            <button className="button primary" onClick={Logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="button primary double" onClick={GoogleLogin}>Google login</button>
                            <div className='email-container'>
                                <input className="inputfield"  type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input className="inputfield" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='email-container'>
                                <button className="button primary double" onClick={EmailLogin}>Login email</button>
                                <button className="button primary double" onClick={EmailRegister}>Register email</button>
                            </div>
                        </>
                    )}
                </ul>
                <button class="button primary hidden">Menu</button>
            </nav>
        
            <section class="title-section">
                <p class="title-large">Welcome, your tranquility oasis awaits</p>
            </section>
        
            <section id="browse" class="browse-section">
    
            <p class="title-middle">Explore the hotels</p>
            <input class="searchbar" placeholder="Search by hotel name, place, description etc."/>
            <section class="grid hotel-cards">
                {hotels.map((hotel, index) => (
                    <article className="hotel-card" key={index}>
                        <div className="card-image" style={{ backgroundImage: `url(${require(`./Assets/${hotel.imageFileName}`)})` }}>
                            <p className="chip">{hotel.city}</p>
                            <p className="chip heart"><img src={heart} alt="Heart"/></p>
                        </div>
                    <p className="text-middle">{hotel.name}</p>
                    <p className="text-small">{hotel.description}</p>
                    <div className="hotel-card-footer">
                        <p className="text-middle">{hotel.stars}</p>
                        <p className="text-middle">{hotel.price}</p>
                    </div>
                    <ul className="nav-links">
                        <Link to={`/Page/${hotel.name}`} className="button third" onClick={() => handleViewOffer(hotel.name)}>View offer <img src={arrow} alt="Arrow"/></Link>
                    </ul>
                    </article>
                ))}
                
            </section>
        </section>
    </body>
    );
}

export default Browse;