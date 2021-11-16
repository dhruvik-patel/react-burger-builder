import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

export class Checkout extends Component {

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
                <CheckoutSummary ingredients={this.props.ings} 
                checkoutContinued={this.checkoutContinued} 
                checkoutCancelled={this.checkoutCancelled}/>
                <Route path={this.props.match.path+'/contact-data'} 
                    component={ ContactData }
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout)
