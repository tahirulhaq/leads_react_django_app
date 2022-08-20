import {
	GET_LEADS,
	DELETE_LEAD,
	ADD_LEAD,
	GET_LEAD,
	ADD_UPDATE_FAIL,
	UPDATE_LEAD,
} from '../actions/types.js'

const initialState = {
	leads: [],
	updated_lead: [],
}

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_LEADS:
			return {
				...state,
				leads: action.payload,
				updated_lead: null,
			}
		case DELETE_LEAD:
			return {
				...state,
				leads: state.leads.filter((lead) => lead.id !== action.payload),
				updated_lead: null,
			}
		case GET_LEAD:
			return {
				...state,
				updated_lead: action.payload,
			}
		case UPDATE_LEAD:
			return {
				...state,
				leads: state.leads.map((lead, index) => {
					if (lead.id === action.payload.id) return action.payload
					else return lead
				}),
				updated_lead: null,
			}

		case ADD_UPDATE_FAIL:
			return {
				...state,
				updated_lead: null,
			}
		case ADD_LEAD:
			return {
				...state,
				leads: [...state.leads, action.payload],
				updated_lead: null,
			}
		default:
			return state
	}
}
