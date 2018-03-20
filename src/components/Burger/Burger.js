import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';


const burger = (props) => {
    let ingredients_list = Object.keys(props.ingredients)
    .map((igKey) => {
        return [...Array(props.ingredients[igKey])]
        .map((_, i) => {
           return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);

    if(ingredients_list.length === 0){
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