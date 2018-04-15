import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    // let ingredients_summary = [];
    // const ingredients_summary = Object.keys(props.ingredients)
    // .map((igKey) => {
    //     return <li key={igKey}> 
    //         <span style={{ textTransform:'capitalize'}}>{igKey} </span> : { props.ingredients[igKey] } 
    //         </li>
    // })
    let ingredients_summary = null;
    if(props.ingredients){
        var counts = {};
    props.ingredients.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

    ingredients_summary = Object.keys(counts).map((igKey) => {
        return <li key={igKey}> <span style={{ textTransform:'capitalize'}}>{igKey} </span> : { counts[igKey] } </li>
    })
    }
    
    ;
    return (
        <Aux>
            <h3> Your Order </h3>
            <p> Your burger contains: </p>
            <ul>
{ingredients_summary}
            </ul>
            <p><strong> Total price: {props.price.toFixed(2)} $ </strong></p>
            <p> Continue to checkout </p>
            <Button btnType="Success" clicked={props.continue}> Continue </Button>
            <Button btnType="Danger" clicked={props.cancel}> Cancel </Button>
        </Aux>
    )
};

export default orderSummary;