import { TrashIcon } from "../assets/images/icons.jsx";

export default function TodoCard({ title, content, creator, date }) {
  return (
    <div className="todo-card">
      <h3>{title}</h3>
      <div className="p-content-div">
        <p className="content">{content}</p>
      </div>
      <p>
        Created {date} by{" "}
        <span className="highlight">
          {creator} <TrashIcon />
        </span>
      </p>
    </div>
  );
}
