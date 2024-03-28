import { useState } from "react";
import "../assets/styles/modal.css";
import { CloseIcon } from "../assets/images/icons.jsx";

export default function NewEditModal() {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");

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

  return (
    <div className="modal-dimmer">
      <div className="modal-body">
        <div className="modal-inner">
          <h4>ADD NEW TASK</h4>
          <CloseIcon />
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
            onChange={handleContent}></textarea>
          <div className="modal-footer">
            <input
              type="text"
              placeholder="Authored by..."
              style={{ width: "50%" }}
              required
              onChange={handleAuthor}
            />
            <span className="time-stamp">{getTimeStamp()}</span>
            <button
              className="add-note"
              disabled={
                titleInput === "" || contentInput === "" || authorInput === ""
              }>
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
