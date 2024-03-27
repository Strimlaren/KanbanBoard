import React from "react";

export default function TodoCard({ title, content, creator, date }) {
  return (
    <div className="todo-card">
      <h3>{title}</h3>
      <p>{content}</p>
      <p>{"Created " + date + " by " + creator}</p>
    </div>
  );
}
