import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store.ts";
import { useEffect, useState } from "react";
import { fetchAllContacts } from "../../thunk/thunk.ts";
import { Contact } from "../../types";
import ModalContact from "../../component/ModalContact/ModalContact.tsx";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [modal, setModal] = useState<Contact | null>(null);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const clickOnContact = (contact: Contact) => {
    setModal(contact);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div>
      {modal && <ModalContact contacts={modal} closeModal={closeModal} />}
      <h2>All contacts:</h2>
      <div>
        {contacts && contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id} onClick={() => clickOnContact(contact)}>
              <div className="row border border-dark mt-3 w-50 p-3">
                <div className="col-3">
                  <img
                    className="w-75"
                    src={contact.photo}
                    alt={contact.name}
                  />
                </div>
                <div className="col-2">
                  <h3 className="mt-4">{contact.name}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts</p>
        )}
      </div>
    </div>
  );
};

export default Home;
