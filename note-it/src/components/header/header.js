import './header.css'
import React from 'react'
import { Link } from 'react-router-dom';
import logouv from '../../images/logouv.jpg';

export default function Header(props){
    return( 
        <header className="row header">
        <div>
          <Link to="/">
            <img src={logouv} alt="Logo" />
          </Link>
        </div>
        <div>
          <Link to="/login">Inicia sesión</Link>
        </div>
      </header>
    );
} 