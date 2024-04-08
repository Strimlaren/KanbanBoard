import ColumnList from "./components/ColumnList.jsx";
import Header from "./components/Header.jsx";
import Error from "./components/Error.jsx";
import Provider from "./components/Provider.jsx";
import RoutedColumnList from "./components/RoutedColumnList.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Provider>
        <Header>MMC Kanban Board</Header>
        <Routes>
          <Route path="/" element={<ColumnList />} />
          <Route path="/col/*" element={<RoutedColumnList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Provider>
    </>
  );
}
