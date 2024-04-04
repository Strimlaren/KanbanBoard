import Column from "./Column";
import Error from "./Error";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function RoutedColumnList() {
  const [cards, setCards] = useContext(DataContext);

  return (
    <>
      <section className="column-list">
        <Routes>
          {cards.map((card, index) => {
            return (
              <Route
                key={index}
                path={`/${card.columnTitle}`}
                element={<Column card={card} colpos={index} />}
              />
            );
          })}
          <Route path="*" element={<Error />} />
        </Routes>
      </section>
    </>
  );
}
