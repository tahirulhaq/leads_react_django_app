import React, { Fragment, Component } from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Redirect,
} from 'react-router-dom'
import Header from './layout/Header'
import Dashboard from './leads/Dashboard'
import { Provider } from 'react-redux'
import store from '../store'
import Login from './accounts/Login'
import Register from './accounts/Register'
import { PrivateRoute } from './common/PrivateRoute'
import { loadUser } from '../actions/auth'

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser())
	}
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Fragment>
						<Header />
						<div className='container'>
							<Routes>
								<Route
									exact
									path='/'
									element={
										<PrivateRoute>
											<Dashboard />
										</PrivateRoute>
									}
								/>
								<Route exact path='/register' element={<Register />} />
								<Route exact path='/login' element={<Login />} />
							</Routes>
						</div>
					</Fragment>
				</Router>
			</Provider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
