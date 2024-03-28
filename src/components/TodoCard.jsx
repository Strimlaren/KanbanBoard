import {
  TrashIcon,
  EditIcon,
  DoneIcon,
  ReturnIcon,
} from "../assets/images/icons.jsx";

export default function TodoCard({ colpos, title, content, creator, date }) {
  return (
    <div className="todo-card">
      <h3>{title}</h3>
      <div className="p-content-div">
        <p>{content}</p>
      </div>
      <div className="card-footer">
        <p>
          Created {date} by <span className="highlight">{creator}</span>
        </p>
        <div className="icon-container">
          {colpos !== 0 && (
            <span className="left-icon">
              <ReturnIcon />
            </span>
          )}
          <TrashIcon />
          <EditIcon />
          <span className="right-icon">
            <DoneIcon />
          </span>
        </div>
      </div>
    </div>
  );
}
