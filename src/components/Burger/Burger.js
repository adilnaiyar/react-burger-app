import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Burger.css';
import BurgerIndgrident from '../../components/Burger/BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) =>{
                return <BurgerIndgrident key = {igKey + i} type = {igKey} />
            });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if(transformedIngredients.length === 0)
    {
        transformedIngredients = <p>Please Start Adding ingredients!! </p>
    }


    return (
        <div className = {classes.Burger}>
            <BurgerIndgrident type = "bread-top"/>
            {transformedIngredients}
            <BurgerIndgrident type = "bread-bottom"/>
        </div>
    );
};

export default withRouter(Burger);