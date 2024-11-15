import { Contact } from '../../types';
import * as React from 'react';

interface Props {
  contacts: Contact;
  closeModal: () => void;
}

const ModalContact: React.FC <Props> = ({contacts, closeModal}) => {
  if (!contacts) return null;
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
            <button type="button" className="btn btn-secondary">
               Delete
            </button>
            <button type="button" className="btn btn-primary">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContact;