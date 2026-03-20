import "./entityCard.scss";

const EntityCard = ({
  item,
  onToggle,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`entity-card ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <div className="top">
        <h3>{item.name}</h3>
      </div>

      <div className="bottom">
        <button
          className={item.isActive ? "active" : "inactive"}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(item);
          }}
        >
          {item.isActive ? "Active" : "Inactive"}
        </button>
      </div>
    </div>
  );
};

export default EntityCard;