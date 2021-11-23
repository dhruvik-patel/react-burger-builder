import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import ToggleDrawer from '../SideDrawer/ToggleDrawer/ToggleDrawer'

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <ToggleDrawer toggled={props.toggle}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    )
}

export default Toolbar
