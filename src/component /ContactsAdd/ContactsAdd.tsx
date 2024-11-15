import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { useState } from 'react';
import * as React from 'react';
import { fetchAddContact, fetchAllContacts } from '../../thunk/thunk.ts';
import { useNavigate } from 'react-router-dom';

const ContactsAdd = () => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = {name, email, phone, photo};
    await dispatch(fetchAddContact(newContact));
    await dispatch(fetchAllContacts())
    navigate('/');
    setName('');
    setEmail('');
    setPhone('');
    setEmail('');
  }

  return (
    <div>
      <h2>Add new contact</h2>
      <form className="form w-25" onSubmit={onSubmitForm}>
        <div>
          <label className="form-label mt-2">Name:</label>
          <input
            value={name}
            className="form-control"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label mt-2">Phone</label>
          <input
            value={phone}
            className="form-control"
            type="text"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label mt-2">Email</label>
          <input
            value={email}
            className="form-control"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label mt-2">Photo:</label>
          <input
            value={photo}
            className="form-control"
            type="text"
            name="photo"
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>
        <br/>
        <label className="form-label mt-2">Preview:</label>
        <div>
          {photo && <img src={photo} alt="Preview" className='w-50'/>}
        </div>
        <br/>
        <button type='submit' className='btn bg-black text-white mt-2'>Add</button>
      </form>
    </div>
  );
};

export default ContactsAdd;