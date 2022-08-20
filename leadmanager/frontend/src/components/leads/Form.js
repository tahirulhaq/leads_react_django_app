import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addLead, updateLead } from '../../actions/leads'
export class Form extends Component {
	state = {
		name: '',
		email: '',
		message: '',
	}

	static propTypes = {
		addLead: PropTypes.func.isRequired,
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value })

	onSubmit = (e) => {
		e.preventDefault()
		const { name, email, message } = this.state
		const lead = { name, email, message }
		this.props.addLead(lead)
		this.setState({
			name: '',
			email: '',
			message: '',
		})
	}
	onUpdate = (e) => {
		e.preventDefault()
		const { name, email, message } = this.state
		const { id } = this.props.updated_lead
		const lead = { name, email, message }
		// calling updateLead and passing id and lead
		this.props.updateLead(id, lead)
		this.setState({
			name: '',
			email: '',
			message: '',
		})
	}

	componentDidUpdate(prevState) {
		// if updated lead exists
		if (this.props.updated_lead) {
			// check if prevstate is not equal to current state to prevent infinite loop
			if (this.props.updated_lead !== prevState.updated_lead) {
				const { name, email, message } = this.props.updated_lead
				this.setState({
					name: name,
					email: email,
					message: message,
				})
			}
		} else {
			// if updated lead is null
			if (this.props.updated_lead !== prevState.updated_lead) {
				this.setState({
					name: '',
					email: '',
					message: '',
				})
			}
		}
	}

	render() {
		const { name, email, message } = this.state

		// links for update updateLink and SubmitLink

		// flag for which links to display
		let update = false
		if (!this.props.updated_lead) {
			update = false
		} else {
			update = true
		}
		// console.log(update)
		return (
			<div className='card card-body mt-4 mb-4'>
				{update ? <h2>Update Lead</h2> : <h2>Add Lead</h2>}

				<form onSubmit={update ? this.onUpdate : this.onSubmit}>
					<div className='form-group'>
						<label>Name</label>
						<input
							className='form-control'
							type='text'
							name='name'
							onChange={this.onChange}
							value={name}
						/>
					</div>
					<div className='form-group'>
						<label>Email</label>
						<input
							className='form-control'
							type='email'
							name='email'
							onChange={this.onChange}
							value={email}
						/>
					</div>
					<div className='form-group'>
						<label>Message</label>
						<textarea
							className='form-control'
							type='text'
							name='message'
							onChange={this.onChange}
							value={message}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-primary'>
							{update ? 'Update' : 'Submit'}
						</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	updated_lead: state.leads.updated_lead,
	// state.leads is the reducer and .leads is the initial state
})

export default connect(mapStateToProps, { addLead, updateLead })(Form)
