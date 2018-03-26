import React,{ Component } from 'react';
import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OderSummary';


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
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:true,
        purchasing:false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchasable:sum > 0});
    }

    purchaseHandler = () => {
        this.setState({ purchasing:true });
    }

    puchaseCancelHandler = () => {
        this.setState({ purchasing:false });
    }

    purchaseContinueHandler = () => {
        alert("User continues purchase");
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

        this.updatePurchaseState(updatedIngredients);
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

        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}> 
                    <OrderSummary ingredients={this.state.ingredients} continue={this.purchaseContinueHandler} cancel={this.puchaseCancelHandler}
                    price={this.state.totalPrice}/>
                </Modal>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>
                <div>
                    <BuildControls 
                    ingredientsAdded = { this.addIngredientHandler } 
                    ingredientsRemoved={this.removeIngredients}
                    disabled = { disabledInfo }
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price = { this.state.totalPrice}
                    />
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;