import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';


const burger = (props) => {
    let ingredients_list = [];

    props.ingredients.forEach((element,i) => {
        ingredients_list.push(<BurgerIngredient key={i} type={element}/>)
    });

    if(props.ingredients.length === 0){
        ingredients_list = <p> Start adding the ingredients. </p>
    }
 return (
     <div className={classes.Burger}>
    <BurgerIngredient type="bread-top" />
    {ingredients_list}
    <BurgerIngredient type="bread-bottom" />
     </div>
 );    
}

export default burger;