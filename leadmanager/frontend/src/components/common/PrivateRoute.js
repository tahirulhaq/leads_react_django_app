import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { createBrowserHistory } from 'history'

export { PrivateRoute }

let history = createBrowserHistory()
function PrivateRoute({ children }) {
	const { user: authUser, isLoading: isLoading } = useSelector((x) => x.auth)

	if (isLoading) {
		return <h2>Loading...</h2>
	} else if (!authUser) {
		// not logged in so redirect to login page with the return url
		return <Navigate to='/login' state={{ from: history.location }} />
	}

	// authorized so return child components
	return children
}
