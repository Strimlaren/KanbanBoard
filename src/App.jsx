import { useState, createContext } from "react";
import "./App.css";
import ColumnList from "./components/ColumnList";
import { carddata } from "./assets/carddata.jsx";
import Header from "./components/Header";

export const ModalContext = createContext();
export const DataContext = createContext();

export default function App() {
  const [cards, setCards] = useState(carddata);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function handleToggleNewModal() {
    setIsNewModalOpen((prevState) => !prevState);
  }

  function handleToggleEditModal() {
    setIsEditModalOpen((prevState) => !prevState);
  }

  return (
    <>
      <Header />
      <ModalContext.Provider
        value={[
          isNewModalOpen,
          handleToggleNewModal,
          isEditModalOpen,
          handleToggleEditModal,
        ]}>
        <DataContext.Provider value={[cards, setCards]}>
          <ColumnList cards={cards} />
        </DataContext.Provider>
      </ModalContext.Provider>
    </>
  );
}

/*
TODOS:
1: Move modal code to App and send down states with context*/
