import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiDeleteContacts,
  apiGetContacts,
} from "../../redux/contacts/operations";
import {
  selectContacts,
  selectContactsIsError,
  selectContactsIsLoading,
} from "../../redux/contacts/selectors";
import AddContactForm from "../../components/AddContactForm/AddContactForm";
// import FilteredContacts from "../../components/FilteredContacts/FilteredContacts";
import css from "./ContactsPage.module.css";
import { selectFilteredContacts } from "../../redux/filters/slice";
import { selectFilter } from "../../redux/filters/selectors";
import { setFilter } from "../../redux/filters/slice";

const ContactsPage = () => {
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectContactsIsLoading);
  // const isError = useSelector(selectContactsIsError);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filteredContacts = useSelector(selectFilteredContacts);
  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const onDeleteContact = (contactID) => {
    dispatch(apiDeleteContacts(contactID));
    console.log("contactID", contactID);
  };

  const onChangeFilter = (event) => {
    const selectQuery = setFilter(event.target.value);
    dispatch(selectQuery);
  };
  return (
    <div>
      <AddContactForm />
      <h2 className={css.titleRegistration}>Search contact</h2>
      <input
        className={css.input}
        type='text'
        placeholder='Search...'
        value={filter}
        onChange={onChangeFilter}
      />

      <ul className={css.list}>
        {Array.isArray(contacts) && contacts.length === 0 && (
          <li className={css.item}>
            You have no any contacts. Please, add your contact list!
          </li>
        )}
        {filteredContacts !== null &&
          filteredContacts.map((contact) => (
            <li className={css.item} key={contact.id}>
              <h3>Name: {contact.name}</h3>
              <p>Number: {contact.number}</p>
              <button
                className={css.btn}
                onClick={() => onDeleteContact(contact.id)}
                type='button'
              >
                DELETE❌
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
