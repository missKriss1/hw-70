import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddContact,
  fetchAllContacts,
  fetchDelateContact,
} from "../../thunk/thunk.ts";
import { Contact } from "../../types";

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: boolean;
}

export const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchAddContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAddContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(fetchAddContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchDelateContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchDelateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload,
        );
      })
      .addCase(fetchDelateContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
