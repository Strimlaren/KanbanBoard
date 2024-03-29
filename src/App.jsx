import { createContext } from "react";
import "./App.css";
import ColumnList from "./components/ColumnList";
import Header from "./components/Header";

// const MyContext = createContext();
export default function App() {
  return (
    <>
      <Header />
      <ColumnList />
    </>
  );
}

/*
TODOS:
1: Move modal code to App and send down states with context*/
