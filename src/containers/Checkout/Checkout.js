import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
export class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice:0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        // '?bacon=2&cheese=1&meat=1&salad=1'
        // console.log(this.props.location.search)  
        const ingredients = {}
        let price = 0
        for(let param of query.entries()){
            // ['salad', '1']
            // console.log(param)
            if(param[0] === 'price'){
                price = param[1]
            }
            else{
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients:ingredients, totalPrice:price})
    }

    checkoutContinued = () => {
        // console.log(this.state)
        this.props.history.replace('/checkout/contact-data')
    }

    checkoutCancelled = () => {
        this.props.history.goBack()
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} 
                checkoutContinued={this.checkoutContinued} 
                checkoutCancelled={this.checkoutCancelled}/>
                <Route path={this.props.match.path+'/contact-data'} 
                render={(props) => (<ContactData 
                                    ingredients={this.state.ingredients} 
                                    price={this.state.totalPrice}
                                    {...props} />)} />
            </div>
        )
    }
}

export default Checkout
