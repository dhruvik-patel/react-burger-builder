import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {

    checkoutContinued = () => {
        // console.log(this.state)
        this.props.history.replace('/checkout/contact-data')
    }

    checkoutCancelled = () => {
        this.props.history.goBack()
    }
    
    render() {
        let summary = <Redirect to='/' />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (<div>
                            {purchasedRedirect}
                            <CheckoutSummary ingredients={this.props.ings}
                                checkoutContinued={this.checkoutContinued}
                                checkoutCancelled={this.checkoutCancelled} />
                            <Route path={this.props.match.path + '/contact-data'}
                                component={ContactData} />
                        </div>
                    )
        }
        return summary
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout)
