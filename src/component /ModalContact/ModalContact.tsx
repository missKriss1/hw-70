import { Contact } from '../../types';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { fetchDelateContact } from '../../thunk/thunk.ts';
import { Link } from 'react-router-dom';

interface Props {
  contacts: Contact;
  closeModal: () => void;
}

const ModalContact: React.FC <Props> = ({contacts, closeModal}) => {
  const dispatch: AppDispatch = useDispatch();

  if (!contacts) return null;

  const deleteContact = async (id:string) => {
    await dispatch(fetchDelateContact(id))
    closeModal();
  }
  return (
    <div className="modal fade show" tabIndex={-1} style={{display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-2">
                <img src={contacts.photo} alt={contacts.name} className='w-100'/>
              </div>
              <div className="col-10">
                <h3>{contacts.name}</h3>
                <p><strong>Phone:</strong> {contacts.phone}</p>
                <p><strong>Email:</strong> {contacts.email}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => deleteContact(contacts.id)}>
               Delete
            </button>
            <button type="button" className='btn bg-black'>
              <Link to={`/edit-contact/${contacts.id}`} className="navbar-brand text-white fw-bold">Edit</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContact;