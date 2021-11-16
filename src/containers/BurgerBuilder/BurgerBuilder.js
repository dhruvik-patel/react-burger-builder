import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount = () => {
        // console.log(this.props)
        // axios.get('https://burger-builder-dhruvik-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json')
        // .then(res => {this.setState({ingredients: res.data, error:false})})
        // .catch(err => {this.setState({error:true})})
    }

    updatePurchaseState = (ingredients) => {
        const count = Object.keys(ingredients).map(igKey => {return ingredients[igKey]})
                        .reduce((sum,el) => {return sum+el},0)
        return count>0
    }


    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = { ...this.props.ings}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;
        let burger = this.state.error ? <center>Ingredients can't loaded</center> : <Spinner />
        if(this.props.ings){
            burger = <>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            addIngredient={this.props.onIngredientAdded}
                            removeIngredient={this.props.onIngredientRemoved}
                            disabledInfo={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler} />
                    </>
            orderSummary = <OrderSummary ingredients={this.props.ings}
                price={this.props.price}
                continued={this.continuePurchaseHandler}
                cancelled={this.cancelPurchaseHandler} />
        }
        if(this.state.loading){
            orderSummary = <Spinner />
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))