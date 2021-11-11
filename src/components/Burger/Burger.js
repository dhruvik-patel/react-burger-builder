import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    // {salad:2,bacon:1} -> for salad : [:length=2]=>[<type=salad>,<type=salad>]
    // and for bacon: [:length=1]->[<type=bacon>]
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey+i} type={igKey} />
        })
    }).reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
    // reduce will convert [[1],[2],[3],[4]] => [1,2,3,4]

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            {/* {console.log(transformedIngredients)} */}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default Burger
