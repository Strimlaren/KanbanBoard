import { useNavigate } from "react-router";

export default function Header({ children }) {
  const nav = useNavigate();
  return (
    <header>
      <div className="header-backdrop">
        <h1 className="column-title-link" onClick={() => nav("/")}>
          {children}
        </h1>
      </div>
    </header>
  );
}
