import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import * as actions from '../../../store/actions/index'
import {connect} from 'react-redux'

export class Logout extends Component {
    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
