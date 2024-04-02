import "./App.css";
import ColumnList from "./components/ColumnList";
import Header from "./components/Header";
import Provider from "./components/Provider.jsx";

export default function App() {
  return (
    <>
      <Header>MMC Kanban Board</Header>
      <Provider>
        <ColumnList />
      </Provider>
    </>
  );
}
