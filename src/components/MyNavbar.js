import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom'

function MyNavbar() {
    return (
        <Navbar>
            <Container >
                    <Link style={{color: "black"}} className="text-decoration-none" to='/'><h2>PBSpotify</h2></Link>
                    <Link style={{color: "black"}}  className="justify-content-end text-decoration-none" to='/about'>About</Link>
            </Container>
        </Navbar>
    )
}

export default MyNavbar
