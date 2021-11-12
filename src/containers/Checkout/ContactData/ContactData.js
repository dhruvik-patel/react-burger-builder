import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

export class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            pincode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        // console.log(this.props)
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }
        // console.log(order)
        axios.post('/order.json',order)
            .then(res => { 
                    this.setState({ loading: false})
                    this.props.history.push('/')
                })
            .catch(err => { this.setState({ loading: false}) })
    }

    render() {
        let form = (
                    <form>
                        <input className={classes.Input} type="text" name="name" placeholder='Enter your name' />
                        <input className={classes.Input} type="email" name="email" placeholder="Enter mail id" />
                        <input className={classes.Input} type="text" name="street" placeholder='street' />
                        <input className={classes.Input} type="text" name="pincode" placeholder='pincode' />
                        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                    </form>)
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        )
    }
}

export default ContactData
