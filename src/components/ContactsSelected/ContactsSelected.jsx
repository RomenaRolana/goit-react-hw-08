import React from "react";

const ContactsSelected = () => {
  return (
    <div>
      {" "}
      <div>
        <p>Search:</p>
        <input
          type='text'
          value={value}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
          placeholder='Search...'
        />
      </div>
    </div>
  );
};

export default ContactsSelected;
