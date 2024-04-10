import { useContext, useState, useRef, useEffect } from "react";
import { DataContext, ModalContext } from "./Provider.jsx";
import TodoCard from "./TodoCard";
import NewModal from "./NewModal.jsx";
import EditModal from "./EditModal.jsx";
import {
  AddNewIcon,
  ArrowRight,
  ArrowLeft,
  EditTitle,
  DeleteColumn,
} from "../assets/images/icons.jsx";
import { Droppable, Draggable } from "@hello-pangea/dnd";

/* Creates columns from the data-state (cards) */
export default function Column({ card, colpos, nav, columnId, routed }) {
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);
  const [cards, setCards] = useContext(DataContext);
  /* Keeps track of when user is editing a column title */
  const [isEditing, setIsEditing] = useState(false);
  const length = cards.length;
  /* Handles the auto-focusing of the input-field when user clicks the edit column title button */
  const focusInput = useRef(null);
  function handleMoveColumnLeft() {
    /* Make a spread copy of the entire state object including the nested array */
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const tempColumn = newCards[colpos - 1];
      newCards[colpos - 1] = newCards[colpos];
      newCards[colpos] = tempColumn;

      return newCards;
    });
  }

  function handleMoveColumnRight() {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const tempColumn = newCards[colpos + 1];
      newCards[colpos + 1] = newCards[colpos];
      newCards[colpos] = tempColumn;

      return newCards;
    });
  }

  function handleToggleEditColumnName() {
    setIsEditing((prevState) => !prevState);
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }

  function handleUpdateTitle(e) {
    setCards((prevCards) =>
      prevCards.map((column, index) =>
        colpos === index ? { ...column, columnTitle: e.target.value } : column
      )
    );
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleToggleEditColumnName();
  }

  function handleDeleteColumn(e) {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const tempCards = newCards.filter((_, index) => index !== colpos);

      return tempCards;
    });
  }

  /* Whenever isEditing is set to true, set focus on the relative input field. */
  useEffect(() => {
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }, [isEditing]);

  /* Entire column code twice inside a ternary, to stop draggable/droppable contexts to break the routing. This can be made more DRY */
  return (
    <>
      {!routed ? (
        <>
          {isNewModalOpen && <NewModal />}
          {isEditModalOpen[0] && <EditModal />}
          <Draggable draggableId={columnId} index={colpos} key={columnId}>
            {(provided) => {
              return (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.draggableProps}>
                  <div className="column-title" {...provided.dragHandleProps}>
                    {colpos !== 0 && !routed && !isEditing ? (
                      <span
                        className="column-edit-button w13"
                        onClick={handleMoveColumnLeft}>
                        <ArrowLeft />
                      </span>
                    ) : (
                      <span className="column-edit-button w13"></span>
                    )}
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
                          className={nav ? "column-title-link" : undefined}
                          onClick={
                            nav
                              ? () =>
                                  nav(`/col/${card.columnTitle.toLowerCase()}`)
                              : undefined
                          }>
                          {card.columnTitle}
                        </h2>
                      )}

                      <span className="path">{`/col/${card.columnTitle.toLowerCase()}`}</span>
                    </div>
                    {colpos !== length - 1 && !routed && !isEditing ? (
                      <span
                        className="column-edit-button w13"
                        onClick={handleMoveColumnRight}>
                        <ArrowRight />
                      </span>
                    ) : (
                      <span className="column-edit-button w13"></span>
                    )}
                    <span
                      className="column-edit-button edit-title-icon"
                      onClick={handleToggleEditColumnName}>
                      <EditTitle />
                    </span>
                    {colpos > 2 && !routed ? (
                      <span
                        className="delete-column"
                        onClick={handleDeleteColumn}>
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
                        {card.cards.map((cardx, index) => {
                          if (cards.length > 0) {
                            return (
                              <TodoCard
                                key={index}
                                index={index}
                                colpos={colpos}
                                title={cardx.cardTitle}
                                content={cardx.content}
                                creator={cardx.creator}
                                date={cardx.date}
                                id={cardx.id}
                                edited={false}
                              />
                            );
                          } else return;
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            }}
          </Draggable>
        </>
      ) : (
        <>
          {isNewModalOpen && <NewModal />}
          {isEditModalOpen[0] && <EditModal />}
          <div className="column">
            <div className="column-title">
              {colpos !== 0 && !routed && !isEditing ? (
                <span
                  className="column-edit-button w13"
                  onClick={handleMoveColumnLeft}>
                  <ArrowLeft />
                </span>
              ) : (
                <span className="column-edit-button w13"></span>
              )}
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
                    className={nav ? "column-title-link" : undefined}
                    onClick={
                      nav
                        ? () => nav(`/col/${card.columnTitle.toLowerCase()}`)
                        : undefined
                    }>
                    {card.columnTitle}
                  </h2>
                )}

                <span className="path">{`/col/${card.columnTitle.toLowerCase()}`}</span>
              </div>
              {colpos !== length - 1 && !routed && !isEditing ? (
                <span
                  className="column-edit-button w13"
                  onClick={handleMoveColumnRight}>
                  <ArrowRight />
                </span>
              ) : (
                <span className="column-edit-button w13"></span>
              )}
              <span
                className="column-edit-button edit-title-icon"
                onClick={handleToggleEditColumnName}>
                <EditTitle />
              </span>
              {colpos > 2 && !routed ? (
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
                  {card.cards.map((cardx, index) => {
                    if (cards.length > 0) {
                      return (
                        <TodoCard
                          key={index}
                          index={index}
                          colpos={colpos}
                          title={cardx.cardTitle}
                          content={cardx.content}
                          creator={cardx.creator}
                          date={cardx.date}
                          id={cardx.id}
                          edited={false}
                        />
                      );
                    } else return;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </>
      )}
    </>
  );
}
