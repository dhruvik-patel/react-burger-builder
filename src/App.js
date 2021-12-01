import React, {useEffect, Suspense} from 'react'
// import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, withRouter, Switch, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = (props) => {

  const {onTryAutoSignup} = props

  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = (
        <Switch>
        <Route path="/auth" render={() => <Auth/>} />
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to='/' />
        </Switch>
  )
  if(props.isAuthenticated){
    routes = (
        <Switch>
          <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
          <Route path="/orders" render={() => <Orders/>} />
          <Route path='/logout' component={Logout} />
          <Route path="/auth" render={() => <Auth/>} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
    )
  }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckStatus())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


// // this is for axios interceptor closing at unmount
// class App extends Component {

//   state = { show: true }

//   componentDidMount() {
//     setTimeout(() => { this.setState({ show: false }) }, 5000)
//   }

//   render() {
//     return (
//       <div>
//         <Layout>
//           {this.state.show ? <BurgerBuilder /> : null}
//         </Layout>
//       </div>
//     );
//   }
// }