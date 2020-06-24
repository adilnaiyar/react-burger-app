import React from 'react';
import burgerLogo from '../../Assets/images/original.png'
import classes from './Logo.css';

const Logo = (props) => (
    <div className = {classes.Logo}>
        <img src = {burgerLogo}  alt ="MyBurger"/>
    </div>
);

export default Logo;