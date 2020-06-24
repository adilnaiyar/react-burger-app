import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const Controls = [
    {Label: 'Salad',  type: 'salad'},
    {Label: 'Bacon',  type: 'bacon'},
    {Label: 'Cheese', type: 'cheese'},
    {Label: 'Meat',   type: 'meat'}
];

const BuildControls = (props) => (
    <div className = {classes.BuildControlss}>

        <p>Current Price: Rs <strong>{props.price.toFixed(2)}</strong></p>
        {Controls.map(ctrl => (
             <BuildControl 
             key = {ctrl.Label} 
             label = {ctrl.Label}
             added = {() => props.ingredientAdded(ctrl.type)} 
             remove = {() => props.ingredientRemove(ctrl.type)}
             disabled = {props.disabled[ctrl.type]}/>
        ))}

        <button 
        className = {classes.OrderButton} 
        disabled = {!props.purchaseable}
        onClick = {props.ordered}>ORDER NOW:</button>
    </div>
);

export default BuildControls;