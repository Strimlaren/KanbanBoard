import Column from "./Column";
import Error from "./Error";
import { useContext } from "react";
import { DataContext } from "./Provider";
import { useParams } from "react-router-dom";

/* Creates routed columns for individually reaching each column by path */
export default function RoutedColumnList() {
  const [cards, setCards] = useContext(DataContext);

  /* Find the index of column with this path */
  const { colTitle } = useParams();
  let colpos;
  colpos = cards.findIndex(
    (column) => column.columnTitle.toLowerCase() === colTitle
  );

  return (
    <>
      {colpos < 0 ? (
        <Error from="RCL" />
      ) : (
        <section className="column-list">
          <Column card={cards[colpos]} colpos={colpos} routed={true} />
        </section>
      )}
    </>
  );
}
