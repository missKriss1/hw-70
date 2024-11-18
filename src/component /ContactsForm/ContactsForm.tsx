import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store.ts";
import { useState, useEffect } from "react";
import {
  fetchAddContact,
  fetchAllContacts,
  fetchEditContact,
} from "../../thunk/thunk.ts";
import { Link, useNavigate } from "react-router-dom";
import { Contact } from "../../types";
import Spinner from "../Spinner/Spinner.tsx";

interface Props {
  contactEdit: Contact;
  onSubmit: (contactData: Contact) => void;
  isEdit: boolean;
}

const ContactsForm: React.FC<Props> = ({ contactEdit, onSubmit, isEdit }) => {
  const loading = useSelector((state: RootState) => state.contacts.loading);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [newContacts, setNewContacts] = useState<Contact>(contactEdit);

  const userIcon = `https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg`;

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

    if (!newContacts.photo.trim()) {
      newContacts.photo = userIcon;
    }

    if (
      newContacts.phone.trim().length !== 0 ||
      newContacts.name.trim().length !== 0 ||
      newContacts.email.trim().length !== 0
    ) {
      if (isEdit) {
        await dispatch(fetchEditContact(newContacts));
      } else {
        await dispatch(fetchAddContact(newContacts));
      }
      await dispatch(fetchAllContacts());
      navigate("/");
      onSubmit(newContacts);
    } else {
      alert("Fill in the blanks ");
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
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
            {newContacts.photo && (
              <img src={newContacts.photo} alt="Preview" className="w-50" />
            )}
          </div>
          <br />

          <div className="row">
            <div className="col-6">
              <button type="submit" className="btn bg-black text-white mt-2">
                {isEdit ? "Edit contact" : "Add contact"}
              </button>
            </div>
            <div className="col-6">
              <Link to="/" className="btn btn-secondary mt-2 w-100">
                Back
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactsForm;
