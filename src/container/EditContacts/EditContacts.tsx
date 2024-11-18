import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Contact } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store.ts";
import { fetchEditContact, getContactById } from "../../thunk/thunk.ts";
import ContactsForm from "../../component/ContactsForm/ContactsForm.tsx";
import { toast } from "react-toastify";

const EditContacts = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [contactEdit, setContactEdit] = useState<Contact | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const getOneContactById = useCallback(async () => {
    if (id) {
      dispatch(getContactById(id));
      const contact = contacts.find((contact) => contact.id === id);
      setContactEdit(contact || null);
    }
  }, [dispatch, id, contacts]);

  useEffect(() => {
    void getOneContactById();
  }, [getOneContactById]);

  const edit = async (contactData: Contact) => {
    if (id) {
      await dispatch(fetchEditContact(contactData));
      navigate("/");
      toast.success("Contact was edited successfully!");
    }
  };

  if (!contactEdit) return null;

  return (
    <>
      <div>
        <h2>Edit contact</h2>
        <ContactsForm onSubmit={edit} contactEdit={contactEdit} isEdit={true} />
      </div>
    </>
  );
};

export default EditContacts;
