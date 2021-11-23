import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount = () => {
        // console.log(this.props)
        this.props.onInitIngredients()
    }

    updatePurchaseState = (ingredients) => {
        const count = Object.keys(ingredients).map(igKey => {return ingredients[igKey]})
                        .reduce((sum,el) => {return sum+el},0)
        return count>0
    }


    purchaseHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = { ...this.props.ings}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;
        let burger = this.props.error ? <center>Ingredients can't loaded</center> : <Spinner />
        if(this.props.ings){
            burger = <>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            addIngredient={this.props.onIngredientAdded}
                            removeIngredient={this.props.onIngredientRemoved}
                            disabledInfo={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler} 
                            isAuth={this.props.isAuthenticated} />
                    </>
            orderSummary = <OrderSummary ingredients={this.props.ings}
                price={this.props.price}
                continued={this.continuePurchaseHandler}
                cancelled={this.cancelPurchaseHandler} />
        }

        return (
            <>
                <Modal show={this.state.purchasing} cancelPurchase={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    }
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