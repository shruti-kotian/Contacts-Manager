import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const { filtered } = contactContext;

    useEffect(() => {

        if (filtered === null) {
            text.current.value = ''
        }
    })
    const onChange = (e) => {
        if (text.current.value !== '') {
            contactContext.filterContact(e.target.value);
        } else {
            contactContext.clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
        </form>
    )
}

export default ContactFilter