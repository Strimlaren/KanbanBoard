import { useState, useEffect, useContext } from "react";
import "../assets/styles/modal.css";
import { CloseIcon } from "../assets/images/icons.jsx";
import { DataContext, ModalContext } from "../App.jsx";

export function NewModal() {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [cards, setCards] = useContext(DataContext);
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);

  function handleTitle(e) {
    setTitleInput(e.target.value);
  }
  function handleContent(e) {
    setContentInput(e.target.value);
  }
  function handleAuthor(e) {
    setAuthorInput(e.target.value);
  }
  function getTimeStamp() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function handleSubmit() {
    setCards((prevCards) => {
      let newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const newCard = {
        cardTitle: titleInput,
        content: contentInput,
        date: getTimeStamp(),
        creator: authorInput,
      };

      newCards[0].cards.push(newCard);
      handleToggleNewModal();
      return newCards;
    });
  }

  return (
    <div className="modal-dimmer">
      <div className="modal-body">
        <span onClick={handleToggleNewModal}>
          <CloseIcon />
        </span>
        <div className="modal-inner">
          <h4>ADD NEW TASK</h4>
          <input
            type="text"
            placeholder="Enter task title here"
            required
            onChange={handleTitle}
            value={titleInput}
          />
          <textarea
            type="text"
            placeholder="Enter task content here"
            spellCheck="false"
            required
            onChange={handleContent}
            value={contentInput}></textarea>
          <div className="modal-footer">
            <input
              type="text"
              placeholder="Authored by..."
              style={{ width: "50%" }}
              required
              onChange={handleAuthor}
              value={authorInput}
            />
            <span className="time-stamp">{getTimeStamp()}</span>
            <button
              className="add-note"
              disabled={
                titleInput === "" || contentInput === "" || authorInput === ""
              }
              onClick={handleSubmit}>
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
