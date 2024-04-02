import React from "react";
import { createContext, useState, useEffect } from "react";
import { carddata } from "../assets/carddata.jsx";

export const ModalContext = createContext();
export const DataContext = createContext();

export default function Provider({ children }) {
  const storedCardsJSON = localStorage.getItem("data");
  const storedCards = storedCardsJSON ? JSON.parse(storedCardsJSON) : carddata;

  const [cards, setCards] = useState(storedCards);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState([false, null, null]);

  function handleToggleNewModal() {
    setIsNewModalOpen((prevState) => !prevState);
  }

  function handleToggleEditModal(
    index = isEditModalOpen[1],
    colpos = isEditModalOpen[2]
  ) {
    setIsEditModalOpen((prevState) => [!prevState[0], index, colpos]);
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cards));
  }, [cards]);

  return (
    <ModalContext.Provider
      value={[
        isNewModalOpen,
        handleToggleNewModal,
        isEditModalOpen,
        handleToggleEditModal,
        setIsEditModalOpen,
      ]}>
      <DataContext.Provider value={[cards, setCards]}>
        {children}
      </DataContext.Provider>
    </ModalContext.Provider>
  );
}
