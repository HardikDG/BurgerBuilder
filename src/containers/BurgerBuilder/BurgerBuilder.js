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
        ingredients:[]
        ,
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }

    updatePurchaseState = (ingredients) => {

        // const sum = Object.keys(ingredients)
        // .map((igKey) => {
        //     return ingredients[igKey];
        // }).reduce((sum,el) => {
        //     return sum + el;
        // },0);
        this.setState({purchasable:ingredients.length > 0});
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
        // const oldCount = this.state.ingredients[type];
        // const newCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = newCount;

        const updatedIngredients = this.state.ingredients;
        updatedIngredients.push(type);

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredients = (type) => {
        const updatedIngredients = this.state.ingredients;
        const index = updatedIngredients.lastIndexOf(type);

        if(index < 0){
            return;
        }

        // const newCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = newCount;

        updatedIngredients.splice(index,1);

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        
        var counts = {};
        this.state.ingredients.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        // const disabledInfo = { ...this.state.ingredients };
        let disabledInfo = {
            salad:true,
            cheese:true,
            meat:true,
            bacon:true
        }
        for (const key in counts) {
            disabledInfo[key] = counts[key] <= 0
            console.log(disabledInfo);
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