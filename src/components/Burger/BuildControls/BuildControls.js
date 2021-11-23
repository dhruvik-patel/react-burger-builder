import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price : <strong>{props.price.toFixed(2)}<span> $</span></strong></p>
            {controls.map( ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label} 
                    added={() => props.addIngredient(ctrl.type)}
                    removed={() => props.removeIngredient(ctrl.type)}
                    disabled={props.disabledInfo[ctrl.type]}/>
            ))}
            <button className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}>
                    {props.isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
            </button>
        </div>
    )
}

export default BuildControls
