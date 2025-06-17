import React, { useContext, useState } from 'react';
import { ContactContext } from '../context/ContactContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { FaTrash, FaPen } from 'react-icons/fa';

const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="contact-card">
      <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt={contact.name} />
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p><i className="fas fa-map-marker-alt" /> {contact.address}</p>
        <p><i className="fas fa-phone" /> {contact.phone}</p>
        <p><i className="fas fa-envelope" /> {contact.email}</p>
      </div>
      <div className="contact-actions">
        <button onClick={() => navigate(`/edit/${contact.id}`)}><FaPen /></button>
        <button onClick={() => setShowModal(true)}><FaTrash /></button>
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            deleteContact(contact.id);
            setShowModal(false);
          }}
        >
          ¿Estás seguro de eliminar este contacto?
        </Modal>
      )}
    </div>
  );
};

export default ContactCard;

