import React, {Component} from 'react';
import Auxillary from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{

    componentDidUpdate() {
        console.log('[orderSummary] Will update');
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {

            return (
                <li key = {igKey}>
                    <span style = {{textTransform: 'capatalize'}}> {igKey}</span>: {this.props.ingredients[igKey]}
                </li>
                );
        });

        return(
            <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: Rs {this.props.price.toFixed(2)}</strong> </p>
            <p>Continue To CheckOut ?</p>
            <Button btnType = "Danger" clicked = {this.props.purchaseCaneled}>CANCEL</Button>
            <Button btnType = "Success" clicked= {this.props.purchaseContinued}>CONTINUE</Button>
        </Auxillary>
        );
    }
};

export default OrderSummary;