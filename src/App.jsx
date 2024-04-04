import ColumnList from "./components/ColumnList.jsx";
import Header from "./components/Header.jsx";
import Error from "./components/Error.jsx";
import Provider from "./components/Provider.jsx";
import RoutedColumnList from "./components/RoutedColumnList.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header>MMC Kanban Board</Header>
      <Routes>
        <Route
          path="/"
          element={
            <Provider>
              <ColumnList />
            </Provider>
          }
        />
        <Route
          path="/col/*"
          element={
            <Provider>
              <RoutedColumnList />
            </Provider>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
