import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

export const ContactItem = ({ contactProp }) => {

    const contactContext = useContext(ContactContext);


    const { _id, name, email, phone, type } = contactProp;
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left" >
                {name}{' '}<span style={{ float: 'right' }} className={'badge ' + (type == 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (<li>
                    <i className="fas fa-envelope-open" /> {email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone" /> {phone}
                </li>)}
            </ul>
            <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contactProp)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
        </div>
    )
}

ContactItem.propTypes = {
    contactProp: PropTypes.object.isRequired
}