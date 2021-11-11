import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active>Home</NavigationItem>
            <NavigationItem link='/'>Burger Builder</NavigationItem>
        </ul>
    )
}

export default NavigationItems
