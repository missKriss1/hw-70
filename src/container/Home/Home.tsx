import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { useEffect } from 'react';
import {fetchAllContacts } from '../../thunk/thunk.ts';

const Home = () => {
  const dispatch:AppDispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  console.log(contacts);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);
  return (
    <div>
      <h2>All contacts:</h2>
      <div>
        { contacts && contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id}>
              <div className="row border border-dark mt-3 w-50 p-3">
                <div className="col-3">
                  <img className="w-75" src={contact.photo} alt={contact.name}/>
                </div>
                <div className="col-2">
                  <h3 className="mt-4">{contact.name}</h3>
                </div>
              </div>
            </div>
          ))
        ):(
          <p>No contacts</p>
        )}

      </div>
    </div>
  );
};

export default Home;