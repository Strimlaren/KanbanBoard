export default function Header({ children }) {
  return (
    <header>
      <div className="header-backdrop">
        <h1>{children}</h1>
      </div>
    </header>
  );
}
