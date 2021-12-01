import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

export const ContactData = props => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email id'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        pincode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'PINCODE'
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 6
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true,
        },
    })

    const inputChangeHandler = (event, inputIndentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIndentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIndentifier].validation),
            touched: true
        })
        const updatedOrderForm = updateObject(orderForm, { [inputIndentifier]: updatedFormElement} )
        
        let formIsValid = true
        for(let inputIndentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid
        }
        setFormIsValid(formIsValid)
        setOrderForm(updatedOrderForm)
    }

    const orderHandler = (e) => {
        e.preventDefault();
        // console.log(this.props)
        const formData = {}
        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        // console.log(order)
        props.onOrderBurger(order,props.token)
        
    }


    const formElementsArray = []
    for(let key in orderForm){
        formElementsArray.push({
            id:key,
            config:orderForm[key]
        })
    }

    let form = (
                    <form onSubmit={ orderHandler }>
                    {formElementsArray.map(formElement => (
                        <Input key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(e) => inputChangeHandler(e,formElement.id)}/>
                    ))}
                    <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
                </form>)
    if(props.loading){
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact details</h4>
            {form}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData)
