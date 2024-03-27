import React from "react";
import Column from "./Column";

export default function ColumnList() {
  return (
    <>
      <div className="column-list">
        <Column title={"To Do"} />
        <Column title={"Doing"} />
        <Column title={"Done"} />
      </div>
    </>
  );
}
