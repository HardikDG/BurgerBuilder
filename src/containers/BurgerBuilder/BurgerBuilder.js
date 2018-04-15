import React,{ Component } from 'react';
import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import axios from '../../axios-order';

const INGREDIENTS_PRICE = {
    salad:0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients:null,
        totalPrice:5,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount() {
        axios.get('/ingredients.json').then((response) => {
            let ingredients = []
            Object.keys(response.data).forEach((key) => {
                ingredients.push(Array(response.data[key]).fill(key))
            })

            let ingredientsObj = ingredients.reduce((arr,el) => {
                return arr.concat(el);
            })
            this.setState({ingredients:ingredientsObj})
            this.setState({purchasable:ingredientsObj.length > 0});
        }).catch((err) => {
            console.log("Some error occured");
            this.setState({error:true});
        })
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

        this.setState({loading:true});

        var counts = {};
        this.state.ingredients.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

        const orders = {
            ingredients: counts,
            price: this.state.totalPrice,
            customer: {
                name:"Hardik",
                address: {
                    street:"Test",
                    zipcode:4543,
                    country:"India"
                },
                email:"test@example.com",
                delivery:"fastest"
            }
        }
        axios.post('/orders.json',orders).then(response => {
            console.log(response)
            this.setState({loading:false,purchasing:false});
        }).catch((err )=> {
            this.setState({loading:false,purchasing:false});
            console.log(err)

        })
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

        let orderSummary = <OrderSummary ingredients={this.state.ingredients} continue={this.purchaseContinueHandler} cancel={this.puchaseCancelHandler}
        price={this.state.totalPrice}/>
        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        let burgerObj;

            if(!this.state.ingredients){
                burgerObj = this.state.error ? <div> Could not load data </div> : <Spinner />
            } else {
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

               burgerObj = (<Aux><Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    ingredientsAdded = { this.addIngredientHandler } 
                    ingredientsRemoved={this.removeIngredients}
                    disabled = { disabledInfo }
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price = { this.state.totalPrice}
                    /></Aux>)
            }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}> 
                {orderSummary}
                </Modal>
                { burgerObj }
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder,axios);