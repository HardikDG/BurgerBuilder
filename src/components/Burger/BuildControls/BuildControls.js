import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const CONTROLS = [
{ 'label':"Salad", type:"salad" },
{ 'label':"Bacon", type:"bacon" },
{ 'label':"Cheese", type:"cheese" },
{ 'label':"Meat", type:"meat" }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p><strong> { props.price.toFixed(2) } </strong></p>
    { CONTROLS.map( (control) => {
       return <BuildControl key={control.label} label={control.label} type={control.type} added={() => {props.ingredientsAdded(control.type)}} 
       removed={() => { props.ingredientsRemoved(control.type) }} 
       disabled = { props.disabled[control.type] }
       />
    }) }
    <button className={classes.OrderButton} disabled={!props.purchasable} onClick={ props.ordered }> Order Now </button>
    </div>
);

export default buildControls