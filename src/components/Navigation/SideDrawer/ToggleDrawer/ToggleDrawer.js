import React from 'react'
import classes from './ToggleDrawer.module.css'

const ToggleDrawer = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.toggled}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default ToggleDrawer
