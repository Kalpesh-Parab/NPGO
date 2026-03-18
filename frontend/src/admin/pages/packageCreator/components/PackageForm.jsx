import { useState } from "react";
import API from "../../../services/api";

const PackageForm = ({ selected }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    const payload = {
      title,
      price,
      currency: "$",

country:
  selected.type === "country"
    ? selected._id
    : selected.countryId,

      destination:
        selected.type === "destination"
          ? selected._id
          : null,
    };

    try {
      await API.post("/packages", payload);
      alert("Package Created 🚀");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <input
        placeholder="Package Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Create Package
      </button>
    </div>
  );
};

export default PackageForm;