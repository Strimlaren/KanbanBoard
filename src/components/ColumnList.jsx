import Column from "./Column";

export default function ColumnList({ cards }) {
  return (
    <>
      <section className="column-list">
        {cards.map((card, index) => (
          <Column card={card} key={index} colpos={index} />
        ))}
      </section>
    </>
  );
}
