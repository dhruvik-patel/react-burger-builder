import React, {useState, useEffect} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


export const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false)

    const {onInitIngredients} = props
    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const count = Object.keys(ingredients).map(igKey => {return ingredients[igKey]})
                        .reduce((sum,el) => {return sum+el},0)
        return count>0
    }


    const purchaseHandler = () => {
        if (props.isAuthenticated){
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const cancelPurchaseHandler = () => {
        setPurchasing(false)
    }

    const continuePurchaseHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout')
    }

    const disabledInfo = { ...props.ings}
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <=0
    }

    let orderSummary = null;
    let burger = props.error ? <center>Ingredients can't loaded</center> : <Spinner />
    if(props.ings){
        burger = <>
                    <Burger ingredients={props.ings} />
                    <BuildControls
                        addIngredient={props.onIngredientAdded}
                        removeIngredient={props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={props.price}
                        purchasable={updatePurchaseState(props.ings)}
                        ordered={purchaseHandler} 
                        isAuth={props.isAuthenticated} />
                </>
        orderSummary = <OrderSummary ingredients={props.ings}
            price={props.price}
            continued={continuePurchaseHandler}
            cancelled={cancelPurchaseHandler} />
    }

    return (
        <>
            <Modal show={purchasing} cancelPurchase={cancelPurchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))