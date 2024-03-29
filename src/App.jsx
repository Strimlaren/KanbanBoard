import { useState, createContext } from "react";
import "./App.css";
import ColumnList from "./components/ColumnList";
import { carddata } from "./assets/carddata.jsx";
import Header from "./components/Header";

export const ModalContext = createContext();
export const DataContext = createContext();
export default function App() {
  const [cards, setCards] = useState(carddata);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleToggleModal() {
    setIsModalOpen((prevState) => !prevState);
  }
  return (
    <>
      <DataContext.Provider value={[cards, setCards]}>
        <ModalContext.Provider
          value={[isModalOpen, setIsModalOpen, handleToggleModal]}>
          <Header />
          <ColumnList cards={cards} />
        </ModalContext.Provider>
      </DataContext.Provider>
    </>
  );
}

/*
TODOS:
1: Move modal code to App and send down states with context*/
