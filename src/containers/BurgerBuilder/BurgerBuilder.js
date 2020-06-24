import React, {Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    // constructor(){
    //     super(props)
    //     this.state = (...)
    // }

    state = {
        ingredients: null,
        totalPice: 39,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        
        axios.get('https://react-myburger-app-9336d.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ ingredients: response.data});
        })
        .catch(error => {
            this.setState({ error: true});
        });
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchaseable: sum > 0});

    }

    addIngreidentHandler = (type) =>{

        const oldCount     = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updateCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngreidentHandler = (type) =>{

        const oldCount = this.state.ingredients[type];

        if(oldCount <=0)
        {
            return;
        }

        const updateCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updateCount;

        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purChaseHandler = () => {

        this.setState({purchasing: true});
    }

    purChaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        const queryParams = [];

        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPice )

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients 
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0;
        }

        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!!</p> : <Spinner />

        if(this.state.ingredients)
        {
            burger =  (
                <Auxillary>
                    <Burger  ingredients = { this.state.ingredients}/>
                    <BuildControls ingredientAdded = {this.addIngreidentHandler} 
                    ingredientRemove = {this.removeIngreidentHandler} 
                    disabled = {disableInfo}
                    purchaseable = {this.state.purchaseable}
                    ordered = {this.purChaseHandler} 
                    price = {this.state.totalPice}/>
                </Auxillary>
            );

            orderSummary = <OrderSummary  
                ingredients = {this.state.ingredients}
                price = {this.state.totalPice}
                purchaseCaneled = {this.purChaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler} />
        }

        if(this.state.loading)
        {
            orderSummary = <Spinner />
        }


        return (
            <Auxillary>
                <Modal show = {this.state.purchasing} modalClosed = {this.purChaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);