import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import { getLeads, deleteLead, getLead } from '../../actions/leads'

export class Leads extends Component {
	static propTypes = {
		leads: Proptypes.array.isRequired,
		getLeads: Proptypes.func.isRequired,
		deleteLead: Proptypes.func.isRequired,
	}

	// useEffect(() => {}, [])
	componentDidMount() {
		this.props.getLeads()
	}

	render() {
		return (
			<Fragment>
				<h2>Leads</h2>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Message</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{this.props.leads.map((lead) => (
							<tr key={lead.id}>
								<td>{lead.id}</td>
								<td>{lead.name}</td>
								<td>{lead.email}</td>
								<td>{lead.message}</td>
								<td>
									<button
										onClick={this.props.getLead.bind(this, lead.id)}
										className='btn btn-primary btn-sm'
									>
										{' '}
										Update
									</button>{' '}
									<button
										onClick={this.props.deleteLead.bind(this, lead.id)}
										className='btn btn-danger btn-sm'
									>
										{' '}
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Fragment>
		)
	}
}
const mapStateToProps = (state) => ({
	leads: state.leads.leads,
	// state.leads is the reducer and .leads is the initial state
})
export default connect(mapStateToProps, { getLeads, deleteLead, getLead })(
	Leads
)
