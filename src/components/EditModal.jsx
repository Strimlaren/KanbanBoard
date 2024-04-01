import { useContext, useState, useEffect } from "react";
import { DataContext, ModalContext } from "../App.jsx";
import "../assets/styles/modal.css";
import { CloseIcon } from "../assets/images/icons.jsx";

export function EditModal() {
  const [cards, setCards] = useContext(DataContext);
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);

  const [titleInput, setTitleInput] = useState(
    cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].cardTitle
  );
  const [contentInput, setContentInput] = useState(
    cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].content
  );
  const [authorInput, setAuthorInput] = useState(
    cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].creator
  );

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

      newCards[isEditModalOpen[2]].cards[isEditModalOpen[1]] = newCard;
      handleToggleEditModal();
      return newCards;
    });
  }

  return (
    <div className="modal-dimmer">
      <div className="modal-body">
        <span onClick={handleToggleEditModal}>
          <CloseIcon />
        </span>
        <div className="modal-inner">
          <h4>EDIT TASK</h4>
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
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
