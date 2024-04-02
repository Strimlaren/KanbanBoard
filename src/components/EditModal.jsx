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
  });

  function handleContentChange(e) {
    setIsDisabled(false);
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
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
        <span onClick={handleToggleEditModal}>
          <CloseIcon />
        </span>
        <div className="modal-inner">
          <h4>EDIT TASK</h4>
          <input
            type="text"
            placeholder="Enter task title here"
            required
            name="title"
            onChange={handleContentChange}
            value={userInputs.title}
          />
          <textarea
            type="text"
            placeholder="Enter task content here"
            spellCheck="false"
            required
            name="content"
            onChange={handleContentChange}
            value={userInputs.content}></textarea>
          <div className="modal-footer">
            <div>
              <span className="time-stamp">By: </span>
              <input
                type="text"
                style={{ width: "50%" }}
                disabled
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
