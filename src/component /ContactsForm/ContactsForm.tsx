import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { useState, useEffect } from 'react';
import { fetchAddContact, fetchAllContacts, fetchEditContact } from '../../thunk/thunk.ts';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../../types';

interface Props {
  contactEdit: Contact;
  onSubmit: (contactData: Contact) => void;
  isEdit: boolean;
}

const ContactsForm: React.FC<Props> = ({ contactEdit, onSubmit, isEdit }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [newContacts, setNewContacts] = useState<Contact>(contactEdit);

  useEffect(() => {
    if (isEdit && contactEdit) {
      setNewContacts(contactEdit);
    }
  }, [contactEdit, isEdit]);

  const changeContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContacts((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      await dispatch(fetchEditContact(newContacts));
    } else {
      await dispatch(fetchAddContact(newContacts));
    }
    await dispatch(fetchAllContacts());
    navigate('/');
    onSubmit(newContacts);
  };

  return (
    <div>
      <form className="form w-25" onSubmit={onSubmitForm}>
        <div>
          <label className="form-label mt-2">Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={newContacts.name}
            onChange={changeContact}
          />
        </div>

        <div>
          <label className="form-label mt-2">Phone:</label>
          <input
            className="form-control"
            type="text"
            name="phone"
            value={newContacts.phone}
            onChange={changeContact}
          />
        </div>

        <div>
          <label className="form-label mt-2">Email:</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={newContacts.email}
            onChange={changeContact}
          />
        </div>

        <div>
          <label className="form-label mt-2">Photo URL:</label>
          <input
            className="form-control"
            type="text"
            name="photo"
            value={newContacts.photo}
            onChange={changeContact}
          />
        </div>

        <br />
        <label className="form-label mt-2">Preview:</label>
        <div>
          {newContacts.photo && <img src={newContacts.photo} alt="Preview" className="w-50" />}
        </div>
        <br />

        <button type="submit" className="btn bg-black text-white mt-2">
          {isEdit ? 'Edit contact' : 'Add contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactsForm;
