import React, { createContext, useEffect, useState } from 'react';

export const ContactContext = createContext();
const API = 'https://playground.4geeks.com/contact';
const AGENDA_SLUG = 'jusspian';

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const AgendaExists = async () => {
    try {
      const checkRes = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts`);
      if (checkRes.ok) {
        console.log('La agenda ya existe.');
        return true;
      }
      const createRes = await fetch(`${API}/agendas/${AGENDA_SLUG}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (createRes.ok) {
        console.log('Agenda creada correctamente.');
        return true;
      } else {
        const err = await createRes.json();
        console.error('Error al crear la agenda:', err);
        return false;
      }
    } catch (error) {
      console.error('Error en AgendaExists:', error);
      return false;
    }
  };

  const fetchContacts = async () => {
    try {
      if (!(await AgendaExists())) return;
      const res = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts`);
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err) {
      console.error('Error al obtener contactos:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (contact) => {
    if (!(await AgendaExists())) return;
    try {
      const res = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, agenda_slug: AGENDA_SLUG })
      });
      if (res.ok) fetchContacts();
      else console.error('Error al agregar contacto');
    } catch (err) {
      console.error('Error al agregar contacto:', err);
    }
  };

  const updateContact = async (id, contact) => {
    try {
      const res = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, agenda_slug: AGENDA_SLUG })
      });
      if (res.ok) fetchContacts();
      else console.error('Error al actualizar contacto');
    } catch (err) {
      console.error('Error al actualizar contacto:', err);
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`${API}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchContacts();
      else console.error('Error al eliminar contacto');
    } catch (err) {
      console.error('Error al eliminar contacto:', err);
    }
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
