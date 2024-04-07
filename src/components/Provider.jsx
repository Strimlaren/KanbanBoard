import { createContext, useState, useEffect } from "react";
import { carddata } from "../assets/carddata.jsx";

export const ModalContext = createContext();
export const DataContext = createContext();

/* Holder of global states, delivers modaltoggles and contexts to all children to this component. */
export default function Provider({ children }) {
  /* Initialize stored column/card data, if first load then use instruction cards. */
  const storedCardsJSON = localStorage.getItem("data");
  const storedCards = storedCardsJSON ? JSON.parse(storedCardsJSON) : carddata;

  /* Main data-state, modal-open/close states */
  const [cards, setCards] = useState(storedCards);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  /* [isopen?, card-index, col-index] */
  const [isEditModalOpen, setIsEditModalOpen] = useState([false, null, null]);

  function handleToggleNewModal() {
    setIsNewModalOpen((prevState) => !prevState);
  }
  /* Handles toggling of edit modal and passes on card-index and column-index. This so EditModal can use it to get correct data from cards state. */
  function handleToggleEditModal(index, colpos) {
    if (index !== undefined && colpos !== undefined)
      setIsEditModalOpen((prevState) => [!prevState[0], index, colpos]);
    else setIsEditModalOpen([false, null, null]);
  }
  /* Whenever cards is altered, save data to localStorage */
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
