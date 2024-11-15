import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import { Contact } from '../types';

export const fetchAllContacts = createAsyncThunk('contacts/fetchAllContacts', async () => {
  const response = await axiosApi('contacts.json');
  const contactsData = response.data;

  if (contactsData) {
    const contactsInFormat = Object.keys(contactsData).map((contactId) => ({
      ...contactsData[contactId],
      id: contactId,
    }));
    contactsInFormat.reverse();
    return contactsInFormat;
  }
  return [];
});

export const fetchAddContact = createAsyncThunk ('contacts/fetchAddContact', async (contact: Contact) =>{
  const response = await  axiosApi.post(`contacts.json`, contact);
  const newPost = {...contact, id: response.data.name};
  return newPost
})

export const fetchDelateContact = createAsyncThunk<string, string>('contacts/fetchDelateContact', async (id: string) =>{
  await axiosApi.delete(`contacts/${id}.json`);
  console.log( id);
  return id;
})