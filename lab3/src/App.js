import './Pages/style.css';
import Browse from './Pages/Browse';
import Page from './Pages/Page';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';



function App() {
    return(
        <Router>
            
            <div className='App'>
                <div className='content'>
                    <Routes>
                        <Route path="/" element={<Browse />}></Route>
                        <Route path="/Page" element={<Page />} />
                        <Route path="/Page/:hotelName" element={<Page />} />

                    </Routes>
                </div>
            </div>
        </Router>

       
    )
}

export default App;
