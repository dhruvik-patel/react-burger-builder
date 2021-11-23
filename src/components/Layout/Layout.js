import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component{

    state = {
        showSideDrawer: false,
    }

    sideDrawerToggleHandler = () => {
        this.setState(
            (prevState) => {
                return {showSideDrawer: !prevState.showSideDrawer}
            })
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false})
    }

    render() {
        return (
            <>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggle={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)