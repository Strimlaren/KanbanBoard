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
            <h2>Cake? Sushi?</h2>
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
              <h3>404 The cake is a lie</h3>
              <div className="p-content-div">
                <p>
                  So is the cookie. Sushi is real tho. I dont know why this is
                  relevant, it sure as hell wont help you find what you were
                  looking for.
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
