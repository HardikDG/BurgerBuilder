import React,{ Component } from 'react';
import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad:0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients:{
            salad:1,
            bacon:1,
            cheese:1,
            meat:1
        },
        totalPrice:4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

    }

    removeIngredients = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }

        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>
                <div>
                    <BuildControls 
                    ingredientsAdded = { this.addIngredientHandler } 
                    ingredientsRemoved={this.removeIngredients}
                    disabled = { disabledInfo }
                    price = { this.state.totalPrice}
                    />
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;