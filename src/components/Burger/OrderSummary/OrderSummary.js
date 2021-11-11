import React from 'react'
import Button from '../../UI/Button/Button'
import classes from './OrderSummary.module.css'

const OrderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => (
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            ) )

    return (
        <div className={classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.cancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.continued}>Continue</Button>
        

        </div>
    )
}

export default OrderSummary
