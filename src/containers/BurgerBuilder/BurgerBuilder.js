import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount = () => {
        axios.get('https://burger-builder-dhruvik-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json')
        .then(res => {this.setState({ingredients: res.data, error:false})})
        .catch(err => {this.setState({error:true})})
    }

    updatePurchaseState = (ingredients) => {
        const count = Object.keys(ingredients).map(igKey => {return ingredients[igKey]})
                        .reduce((sum,el) => {return sum+el},0)
        this.setState({purchasable: count>0})
    }

    addIngredientHandler = (type) => {
        const oldNo = this.state.ingredients[type]
        const updatedNo = oldNo + 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedNo
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldNo = this.state.ingredients[type]
        if(oldNo <= 0){
            return;
        }
        const updatedNo = oldNo - 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedNo
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {
        // alert('Wooh!! You continued!!')
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        }
        axios.post('/order.json',order)
            .then(res => { this.setState({ loading: false , purchasing: false})})
            .catch(err => { this.setState({ loading: false, purchasing: false }) })
    }

    render() {
        const disabledInfo = { ...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;
        let burger = this.state.error ? <center>Ingredients can't loaded</center> : <Spinner />
        if(this.state.ingredients){
            burger = <>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            addIngredient={this.addIngredientHandler}
                            removeIngredient={this.removeIngredientHandler}
                            disabledInfo={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler} />
                    </>
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder,axios)