import {
  ArrowDown,
  ArrowUp,
  ReturnIcon,
  TrashIcon,
  EditIcon,
  DoneIcon,
} from "../assets/images/icons";

export default function Error() {
  return (
    <>
      <section className="column-list">
        <div className="column">
          <div className="column-title">
            <h2>Dear confused user</h2>
          </div>

          <div className="cards-container">
            <div className="todo-card">
              <div className="lateral-icons-container">
                <span className="arrow-height">
                  <ArrowUp />
                </span>
                <span className="arrow-height">
                  <ArrowDown />
                </span>
              </div>
              <h3>404 Where are you going exactly??</h3>
              <div className="p-content-div">
                <p>
                  I don't know what the hell you are doing and it seems neither
                  do you. Maybe try again. Eventually you might get it right.
                </p>
              </div>
              <div className="card-footer">
                <p>
                  <span>Added </span>
                  2012-12-12 by
                  <span className="highlight"> Mom</span>
                </p>
                <div className="icon-container">
                  <span className="left-icon">
                    <ReturnIcon />
                  </span>
                  <span>
                    <TrashIcon />
                  </span>
                  <span>
                    <EditIcon />
                  </span>
                  <span className="right-icon">
                    <DoneIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
