import axios from 'axios'
import {
	GET_LEADS,
	DELETE_LEAD,
	ADD_LEAD,
	GET_LEAD,
	ADD_UPDATE_FAIL,
	UPDATE_LEAD,
} from './types'
import { tokenConfig } from './auth'
// GET LEADS
export const getLeads = () => (dispatch, getState) => {
	axios
		.get('/api/leads/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_LEADS,
				payload: res.data,
			})
		})
		.catch((err) => console.log(err))
}

// DELETE LEADS
export const deleteLead = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/leads/${id}`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: DELETE_LEAD,
				payload: id,
			})
		})
		.catch((err) => console.log(err))
}

// GET LEAD
export const getLead = (id) => (dispatch, getState) => {
	axios
		.get(`/api/leads/${id}/`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_LEAD,
				payload: res.data,
			})
		})
		.catch((err) => console.log(err))
}

// ADD LEAD
export const addLead = (lead) => (dispatch, getState) => {
	axios
		.post('/api/leads/', lead, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: ADD_LEAD,
				payload: res.data,
			})
		})
		.catch((err) => {
			console.log(err.response.request.response)
			dispatch({
				type: ADD_UPDATE_FAIL,
			})
		})
}

// UPDATE LEAD
export const updateLead = (id, lead) => (dispatch, getState) => {
	axios
		.put(`/api/leads/${id}/`, lead, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: UPDATE_LEAD,
				payload: res.data,
			})
		})
		.catch((err) => {
			console.log(err)
			dispatch({
				type: ADD_UPDATE_FAIL,
			})
		})
}
