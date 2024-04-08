import { useState, useContext } from "react";
import "../assets/styles/modal.css";
import { CloseIcon } from "../assets/images/icons.jsx";
import { DataContext, ModalContext } from "./Provider.jsx";

export default function NewModal() {
  const [cards, setCards] = useContext(DataContext);
  /* State that keeps track of all user inputs and the char count of their current content. */
  const [userInputs, setUserInputs] = useState({
    title: "",
    content: "",
    creator: "",
    titleChar: 0,
    contentChar: 0,
    creatorChar: 0,
  });
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
  ] = useContext(ModalContext);
  /* Universal function that updates any of the user inputs based on the html name attribute. */
  function handleContentChange(e) {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
      [e.target.name + "Char"]: e.target.value.length,
    }));
  }
  /* Returns a time-stamp in YYYY-MM-DD format. */
  function getTimeStamp() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  /* Pushes a new task to the first column and closes the new-task modal window. */
  function handleSubmit() {
    setCards((prevCards) => {
      let newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const newCard = {
        cardTitle: userInputs.title,
        content: userInputs.content,
        date: getTimeStamp(),
        creator: userInputs.creator,
        edited: false,
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
            className="user-title"
            placeholder="Enter task title here"
            required
            name="title"
            maxLength={25}
            spellCheck="false"
            onChange={handleContentChange}
            value={userInputs.title}
          />
          <span className="title-char-counter">
            <span
              className={
                userInputs.titleChar > 19 ? "counter-red" : "counter-gray"
              }>
              {userInputs.titleChar}
            </span>
            /25
          </span>
          <textarea
            type="text"
            className="user-content"
            placeholder="Enter task content here"
            required
            name="content"
            maxLength={300}
            spellCheck="false"
            onChange={handleContentChange}
            value={userInputs.content}></textarea>
          <span className="content-char-counter">
            <span
              className={
                userInputs.contentChar > 259 ? "counter-red" : "counter-gray"
              }>
              {userInputs.contentChar}
            </span>
            /300
          </span>
          <div className="modal-footer">
            <input
              type="text"
              className="user-creator"
              placeholder="Authored by..."
              style={{ width: "50%" }}
              required
              name="creator"
              maxLength={13}
              spellCheck="false"
              onChange={handleContentChange}
              value={userInputs.creator}
            />
            <span className="creator-char-counter">
              <span
                className={
                  userInputs.creatorChar > 9 ? "counter-red" : "counter-gray"
                }>
                {userInputs.creatorChar}
              </span>
              /13
            </span>
            <span className="time-stamp">{getTimeStamp()}</span>
            <button
              className="add-note"
              disabled={
                userInputs.title === "" ||
                userInputs.content === "" ||
                userInputs.creator === ""
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
