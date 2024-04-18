import { useContext, useState, useRef, useEffect } from "react";
import { DataContext, ModalContext } from "./Provider.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import TodoCard from "./TodoCard.jsx";
import NewModal from "./NewModal.jsx";
import Error from "./Error.jsx";
import EditModal from "./EditModal.jsx";
import { Droppable } from "@hello-pangea/dnd";
import {
  AddNewIcon,
  EditTitle,
  DeleteColumn,
} from "../assets/images/icons.jsx";
/* Creates columns from the data-state (cards) */
export default function RoutedTodo() {
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);
  const [cards, setCards] = useContext(DataContext);
  /* Keeps track of when user is editing a column title */
  const [isEditing, setIsEditing] = useState(false);
  /* Handles the auto-focusing of the input-field when user clicks the edit column title button */
  const focusInput = useRef(null);
  const nav = useNavigate();

  /* Get colpos and index of this card inside the cards state */
  const { id } = useParams();

  let colpos;
  let cardIndex;

  cards.find((column, colIndex) => {
    const foundCardIndex = column.cards.findIndex((card) => {
      return card.id === id;
    });
    if (foundCardIndex !== -1) {
      colpos = colIndex;
      cardIndex = foundCardIndex;
      return;
    }
  });

  /* Toggles edit/normal mode of column names. Used for switching the column title between an input and h2 */
  function handleToggleEditColumnName() {
    setIsEditing((prevState) => !prevState);
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }
  /* Updates column titles */
  function handleUpdateTitle(e) {
    setCards((prevCards) =>
      prevCards.map((column, index) =>
        colpos === index ? { ...column, columnTitle: e.target.value } : column
      )
    );
  }
  /* Allows for confirming column name change with enter key */
  function handleKeyPress(e) {
    if (e.key === "Enter") handleToggleEditColumnName();
  }
  /* Handles deletion of columns */
  function handleDeleteColumn() {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const tempCards = newCards.filter((_, index) => index !== colpos);
      /* Go through columns and make sure all columnIds are in cronological order (drag and drop requirement) */
      let i = 0;
      tempCards.forEach((column) => {
        column.columnId = String(i);
        i++;
      });
      return tempCards;
    });
  }
  /* Whenever isEditing is set to true, set focus on the relative input field. */
  useEffect(() => {
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }, [isEditing]);
  /* Entire column code twice inside a ternary, to stop draggable/droppable contexts to break the routing. This can and should be made more DRY */
  return (
    <>
      {!colpos ? (
        <Error from="RoutedTodo" />
      ) : (
        <>
          {isNewModalOpen && <NewModal />}
          {isEditModalOpen[0] && <EditModal />}
          <section className="column-list">
            <div className="column">
              <div className="column-title">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      maxLength={15}
                      className="title-edit-input"
                      required
                      spellCheck={false}
                      value={cards[colpos].columnTitle}
                      onChange={handleUpdateTitle}
                      onKeyDown={handleKeyPress}
                      ref={focusInput}
                    />
                  ) : (
                    <h2
                      className={"column-title-link"}
                      onClick={() =>
                        nav(`/col/${cards[colpos].columnTitle.toLowerCase()}`)
                      }>
                      {cards[colpos].columnTitle}
                    </h2>
                  )}
                  <span className="path">{`/col/${cards[
                    colpos
                  ].columnTitle.toLowerCase()}`}</span>
                </div>
                <span
                  className="column-edit-button edit-title-icon"
                  onClick={handleToggleEditColumnName}>
                  <EditTitle />
                </span>
                {colpos > 2 ? (
                  <span className="delete-column" onClick={handleDeleteColumn}>
                    <DeleteColumn />
                  </span>
                ) : undefined}

                {colpos === 0 && (
                  <div className="add-icon">
                    <span onClick={handleToggleNewModal}>
                      <AddNewIcon />
                    </span>
                  </div>
                )}
              </div>
              <Droppable droppableId={cards[colpos].columnId} type="task">
                {(provided) => (
                  <div
                    className="cards-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <TodoCard
                      index={cardIndex}
                      colpos={colpos}
                      id={cards[colpos].cards[cardIndex].id}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </section>
        </>
      )}
    </>
  );
}
