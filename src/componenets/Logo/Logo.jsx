import React from 'react'
import './Logo.css'
import machine from './machine.png'
import Tilt from 'react-tilt'

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img style={{paddingTop: '5px'}} src={machine} alt="Machine Learning" />
                </div>
            </Tilt>
        </div>
        
    )
}

export default Logo;