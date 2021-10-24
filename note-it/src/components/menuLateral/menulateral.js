import './menuLateral.css'
import {React, useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function MenuLateral(props){
    useEffect(() => {
        const linkColor = document.querySelectorAll('.nav__link')
    
        function colorLink(){
            if(linkColor){
                linkColor.forEach(l=> l.classList.remove('active'))
                this.classList.add('active')
            }
        }
        linkColor.forEach(l=> l.addEventListener('click', colorLink))
      }, []);

    return( 
        <div className="l-navbar" id="nav-bar">
            <nav className="nav">
                <div>
                    <div className="nav__logo">
                        <i className='bx bx-book-bookmark nav__logo-icon'></i>
                    </div>

                    <div className="nav__list">
                        <Link to="/" className="nav__link">
                            <i className='bx bx-user nav__icon' ></i>
                            <span className="nav__name">Usuario</span>
                        </Link>

                        <Link to="/" className="nav__link">
                            <i className='bx bx-note nav__icon' ></i>
                            <span className="nav__name">Notas</span>
                        </Link>

                        <Link to="/" className="nav__link">
                            <i className='bx bx-notepad nav__icon' ></i>
                            <span className="nav__name">Listas</span>
                        </Link>

                        <Link to="/" className="nav__link">
                            <i className='bx bx-star nav__icon' ></i>
                            <span className="nav__name">Favorites</span>
                        </Link>
                    </div>
                </div>

                <Link to="/" className="nav__link">
                    <i className='bx bx-log-out nav__icon' ></i>
                    <span className="nav__name">Log Out</span>
                </Link>
            </nav>
            <script src="./main.js" defer></script>
        </div>
    );
} 