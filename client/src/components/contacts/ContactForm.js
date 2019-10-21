import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import { UPDATE_CONTACTS } from '../../context/types';

export const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const { addContact, current, clearCurrent, updateContact } = contactContext;
    const [contactProp, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: ''
    })

    const { name, email, phone, type } = contactProp;

    useEffect(() => {
        if (current !== null) {
            setContact(current)
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: ''
            })
        }
    }, [contactContext, current])

    const onChange = (e) => {
        setContact({ ...contactProp, [e.target.name]: e.target.value }); //if it was just one field could have done setContact({contact})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addContact(contactProp);
        } else {
            updateContact(contactProp);
        }

        setContact({
            name: '',
            email: '',
            phone: '',
            type: ''
        })
    }

    const clearAll = () => {
        clearCurrent();
    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type="text" placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type="text" placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name='type' value="personal" checked={type === 'personal'} onChange={onChange} />  Personal <span></span>
            <input type="radio" name='type' value="professional" checked={type === 'professional'} onChange={onChange} />  Professional
            <div>
                <input type="Submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary brn-block" />
            </div>
            {current &&
                <div>
                    <button className="btn btn-light brn-block" onClick={clearAll}> Clear </button>
                </div>}
        </form>
    )
}

