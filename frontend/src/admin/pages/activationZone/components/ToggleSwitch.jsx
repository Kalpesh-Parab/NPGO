import "./toggleSwitch.scss";

const ToggleSwitch = ({ mode, setMode }) => {
  return (
    <div className="toggle-switch">
      <button
        className={mode === "domestic" ? "active" : ""}
        onClick={() => setMode("domestic")}
      >
        Domestic
      </button>

      <button
        className={mode === "international" ? "active" : ""}
        onClick={() => setMode("international")}
      >
        International
      </button>
    </div>
  );
};

export default ToggleSwitch;