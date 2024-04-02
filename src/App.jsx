import ColumnList from "./components/ColumnList.jsx";
import Header from "./components/Header.jsx";
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
