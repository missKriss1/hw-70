import { useNavigate } from 'react-router-dom';
import ContactsForm from '../../component /ContactsForm/ContactsForm.tsx';

const AddContacts = () => {
  const navigate = useNavigate();

  const addFormContact = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Add new contact</h2>
      <ContactsForm onSubmit={addFormContact} contactEdit={{id:'', name: '', email: '', phone: '', photo: '' }} isEdit={false} />
    </div>
  );
};

export default AddContacts;
