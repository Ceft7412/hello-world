import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({});

  // This will show the modal based on the modalType passed to it as an argument.
  // For example: showModal("login") will show the login modal. The previous state is passed to the function and the modalType is set to true.
  // The modal type is for example "login" or "signup".
  // The [modalType] is a computed property name. It allows you to use a variable as the property name, that's why we can use it like this: [modalType]: true.
  // or [signup]: true.
  // To use the show modal, we can do it like this: showModal("login") or showModal("signup").
  // And to hide the modal, we can do it like this: hideModal("login") or hideModal("signup").
  const showModal = (modalType) => setModals((prev) => ({ ...prev, [modalType]: true }));
  const hideModal = (modalType) => setModals((prev) => ({ ...prev, [modalType]: false }));

  return (
    <ModalContext.Provider value={{ modals, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
