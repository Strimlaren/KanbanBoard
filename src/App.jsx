import ColumnList from "./components/ColumnList.jsx";
import Header from "./components/Header.jsx";
import Error from "./components/Error.jsx";
import Provider from "./components/Provider.jsx";
import RoutedTodo from "./components/RoutedTodo.jsx";
import RoutedColumnList from "./components/RoutedColumnList.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Provider>
        <Header>MMCanban</Header>
        <Routes>
          <Route path="/" element={<ColumnList />} />
          <Route path="/:id" element={<RoutedTodo />} />
          <Route path="/col/:colTitle/*" element={<RoutedColumnList />} />
          <Route path="*" element={<Error from="Home" />} />
        </Routes>
      </Provider>
    </>
  );
}
