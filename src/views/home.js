import React, { useState, useEffect } from 'react'

import Navbar from '../components/navbar.js';
import Initial from "./inicial.js";

function Home(){

    const [usuario, setUsuario] = useState({})
    

    return (
        <div className="container"> 
            <Navbar />
        </div>
    )
}

export default Home;