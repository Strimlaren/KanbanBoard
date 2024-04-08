import Column from "./Column";
import Error from "./Error";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { Routes, Route } from "react-router-dom";

/* Creates routed columns for individually reaching each column by path */
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
                element={<Column card={card} colpos={index} routed={true} />}
              />
            );
          })}
          <Route path="*" element={<Error />} />
        </Routes>
      </section>
    </>
  );
}
