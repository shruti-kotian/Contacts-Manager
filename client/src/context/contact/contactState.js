import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import { ContactReducer } from './contactReducer'
import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACTS, FILTER_CONTACTS, CLEAR_FILTER, CLEAR_CONTACTS, CONTACT_ERROR } from '../types'
import Axios from 'axios'


export const ContactState = (props) => {

    const initialState = {
        contacts: null, //array which is null
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //Get Contacts
    const getContacts = async () => {

        try {

            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    //Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.res.msg })
        }

    }
    //Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.res.msg })
        }
    }

    //Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.res.msg })
        }
    }

    //Clear Contact
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    //Set Current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    //Filter Contact
    const filterContact = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    //Clear Contact
    const clearFilter = () => {
        dispatch({ type: FILTER_CONTACTS })
    }
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact,
                deleteContact,
                current: state.current,
                setCurrent,
                clearCurrent,
                updateContact,
                filtered: state.filtered,
                filterContact,
                clearFilter,
                error: state.error,
                getContacts,
                clearContacts
            }}>
            {props.children}
        </ContactContext.Provider >
    )
}
