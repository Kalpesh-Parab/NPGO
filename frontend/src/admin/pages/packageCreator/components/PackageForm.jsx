import "./packageForm.scss";
import { useState } from "react";
import API from "../../../services/api";

const PackageForm = ({ selected, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    currency: "INR",
    description: "",

    heroMedia: { type: "image", url: "" },

    gallery: [],

    itinerary: [],

    types: [""],
    included: [""],
    notIncluded: [""],
  });

  // -----------------------------
  // BASIC HANDLERS
  // -----------------------------
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const addField = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  // -----------------------------
  // UPLOAD HANDLER
  // -----------------------------
  const handleUpload = async (file, type, index = null) => {
    const data = new FormData();
    data.append("file", file);

    const res = await API.post("/upload", data);

    if (type === "hero") {
      setForm((prev) => ({
        ...prev,
        heroMedia: res.data,
      }));
    }

    if (type === "gallery") {
      setForm((prev) => ({
        ...prev,
        gallery: [...prev.gallery, { ...res.data, caption: "" }],
      }));
    }

    if (type === "itinerary-media") {
      const updated = [...form.itinerary];
      updated[index].media.push({ ...res.data, caption: "" });
      setForm({ ...form, itinerary: updated });
    }
  };

  // -----------------------------
  // ITINERARY HANDLERS
  // -----------------------------
  const addDay = () => {
    setForm((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          id: prev.itinerary.length + 1,
          day: `Day ${prev.itinerary.length + 1}`,
          title: "",
          description: [{ heading: "", content: "" }],
          media: [],
        },
      ],
    }));
  };

  const updateDayField = (index, field, value) => {
    const updated = [...form.itinerary];
    updated[index][field] = value;
    setForm({ ...form, itinerary: updated });
  };

  const updateDescription = (dayIndex, descIndex, field, value) => {
    const updated = [...form.itinerary];
    updated[dayIndex].description[descIndex][field] = value;
    setForm({ ...form, itinerary: updated });
  };

  const addDescriptionBlock = (dayIndex) => {
    const updated = [...form.itinerary];
    updated[dayIndex].description.push({ heading: "", content: "" });
    setForm({ ...form, itinerary: updated });
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      price: Number(form.price),
      currency: form.currency,
      description: form.description,

      heroMedia: form.heroMedia,
      gallery: form.gallery,
      itinerary: form.itinerary,

      types: form.types.filter(Boolean),

      inclusions: {
        included: form.included.filter(Boolean),
        notIncluded: form.notIncluded.filter(Boolean),
      },

      country:
        selected.type === "country"
          ? selected._id
          : selected.countryId,

      destination:
        selected.type === "destination" ? selected._id : null,
    };

    await API.post("/packages", payload);
    alert("Package Created 🚀");
    onSuccess && onSuccess();
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="package-form">
      <h3>Create Package</h3>

      {/* BASIC */}
      <input
        placeholder="Package Title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => handleChange("price", e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      {/* HERO */}
      <h4>Hero Media</h4>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0], "hero")} />
      {form.heroMedia.url && <img src={form.heroMedia.url} width={200} />}

      {/* GALLERY */}
      <h4>Gallery</h4>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0], "gallery")} />

      {form.gallery.map((item, i) => (
        <div key={i}>
          <img src={item.url} width={100} />
          <input
            placeholder="Caption"
            value={item.caption}
            onChange={(e) => {
              const updated = [...form.gallery];
              updated[i].caption = e.target.value;
              setForm({ ...form, gallery: updated });
            }}
          />
        </div>
      ))}

      {/* ITINERARY */}
      <h4>Itinerary</h4>
      {form.itinerary.map((day, i) => (
        <div key={i}>
          <h5>{day.day}</h5>

          <input
            placeholder="Title"
            value={day.title}
            onChange={(e) => updateDayField(i, "title", e.target.value)}
          />

          {/* Description Blocks */}
          {day.description.map((desc, j) => (
            <div key={j}>
              <input
                placeholder="Heading"
                value={desc.heading}
                onChange={(e) =>
                  updateDescription(i, j, "heading", e.target.value)
                }
              />
              <textarea
                placeholder="Content"
                value={desc.content}
                onChange={(e) =>
                  updateDescription(i, j, "content", e.target.value)
                }
              />
            </div>
          ))}

          <button onClick={() => addDescriptionBlock(i)}>
            + Add Description
          </button>

          {/* Media */}
          <input
            type="file"
            onChange={(e) =>
              handleUpload(e.target.files[0], "itinerary-media", i)
            }
          />

          {day.media.map((m, k) => (
            <div key={k}>
              <img src={m.url} width={80} />
              <input
                placeholder="Caption"
                value={m.caption}
                onChange={(e) => {
                  const updated = [...form.itinerary];
                  updated[i].media[k].caption = e.target.value;
                  setForm({ ...form, itinerary: updated });
                }}
              />
            </div>
          ))}
        </div>
      ))}

      <button onClick={addDay}>+ Add Day</button>

      <button onClick={handleSubmit}>Create Package</button>
    </div>
  );
};

export default PackageForm;