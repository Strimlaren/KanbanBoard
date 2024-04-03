import { useContext, useState } from "react";
import { DataContext, ModalContext } from "./Provider.jsx";
import "../assets/styles/modal.css";
import { CloseIcon, TrashIcon } from "../assets/images/icons.jsx";

export default function EditModal() {
  const [cards, setCards] = useContext(DataContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [
    isNewModalOpen,
    handleToggleNewModal,
    isEditModalOpen,
    handleToggleEditModal,
    setIsEditModalOpen,
  ] = useContext(ModalContext);
  const [userInputs, setUserInputs] = useState({
    title: cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].cardTitle,
    content: cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].content,
    creator: cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].creator,
    titleChar:
      cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].cardTitle.length,
    contentChar:
      cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].content.length,
    creatorChar:
      cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].creator.length,
  });

  function handleContentChange(e) {
    setIsDisabled(false);
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
      [e.target.name + "Char"]: e.target.value.length,
    }));
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
        cardTitle: userInputs.title,
        content: userInputs.content,
        date: getTimeStamp(),
        creator: userInputs.creator,
        edited: true,
      };

      newCards[isEditModalOpen[2]].cards[isEditModalOpen[1]] = newCard;
      handleToggleEditModal();
      return newCards;
    });
  }
  function handleDelete() {
    setCards((prevCards) => {
      const newCards = prevCards.map((column) => ({
        ...column,
        cards: column.cards.map((card) => ({ ...card })),
      }));

      const filteredColumnCards = newCards[isEditModalOpen[2]].cards.filter(
        (_, i) => i !== isEditModalOpen[1]
      );
      newCards[isEditModalOpen[2]].cards = filteredColumnCards;
      handleToggleEditModal();
      return newCards;
    });
  }

  return (
    <div className="modal-dimmer">
      <div className="modal-body">
        {/* <div className="modal-column-close-border">
          <div className="modal-column-close" onClick={handleToggleEditModal}> */}
        <CloseIcon />
        {/* </div>
        </div> */}
        <div className="modal-column-title-border">
          <div className="modal-column-title">
            {cards[isEditModalOpen[2]].columnTitle}
          </div>
        </div>
        <div className="modal-inner">
          <h4>EDIT TASK</h4>
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
                userInputs.titleChar > 24 ? "counter-red" : "counter-gray"
              }>
              {userInputs.titleChar}
            </span>
            /25
          </span>
          <textarea
            type="text"
            className="user-content"
            placeholder="Enter task content here"
            spellCheck="false"
            required
            name="content"
            maxLength={300}
            onChange={handleContentChange}
            value={userInputs.content}></textarea>
          <span className="content-char-counter">
            <span
              className={
                userInputs.contentChar > 250 ? "counter-red" : "counter-gray"
              }>
              {userInputs.contentChar}
            </span>
            /300
          </span>
          <div className="modal-footer">
            <div>
              <span className="time-stamp">By: </span>
              <input
                type="text"
                style={{ width: "50%" }}
                disabled
                spellCheck="false"
                value={userInputs.creator}
              />
            </div>
            <span className="time-stamp">
              {cards[isEditModalOpen[2]].cards[isEditModalOpen[1]].date}
            </span>
            <div className="buttons-div">
              <button onClick={handleDelete} className="add-note del">
                <TrashIcon />
              </button>
              <button
                className="add-note"
                disabled={isDisabled}
                onClick={handleSubmit}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
