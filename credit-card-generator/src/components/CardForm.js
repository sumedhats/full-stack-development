import React, { useState } from "react";

function CardForm({ cardData, setCardData, onSubmit }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "number") {
      newValue = value.replace(/\D/g, "");
      newValue = newValue.replace(/(.{4})/g, "$1 ").trim();
      newValue = newValue.substring(0, 19);
    }

    if (name === "month") {
      newValue = value.replace(/\D/g, "").substring(0, 2);
    }

    if (name === "year") {
      newValue = value.replace(/\D/g, "").substring(0, 2);
    }

    if (name === "cvc") {
      newValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setCardData({
      ...cardData,
      [name]: newValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!cardData.name.trim()) {
      newErrors.name = "Can't be blank";
    }

    const cleanCardNumber = cardData.number.replace(/\s/g, "");

    if (!cleanCardNumber) {
      newErrors.number = "Can't be blank";
    } else if (!/^\d{16}$/.test(cleanCardNumber)) {
      newErrors.number = "Wrong format";
    }

    if (!cardData.month) {
      newErrors.month = "Can't be blank";
    } else if (!/^(0[1-9]|1[0-2])$/.test(cardData.month)) {
      newErrors.month = "Wrong format";
    }

    if (!cardData.year) {
      newErrors.year = "Can't be blank";
    } else if (!/^\d{2}$/.test(cardData.year)) {
      newErrors.year = "Wrong format";
    }

    if (!cardData.cvc) {
      newErrors.cvc = "Can't be blank";
    } else if (!/^\d{3}$/.test(cardData.cvc)) {
      newErrors.cvc = "Wrong format";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(cardData);
  };

  return (
    <form className="card-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">CARDHOLDER NAME</label>

        <input
          id="name"
          type="text"
          name="name"
          placeholder="e.g. Jane Appleseed"
          value={cardData.name}
          onChange={handleChange}
        />

        {errors.name && (
          <p className="error">{errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="number">CARD NUMBER</label>

        <input
          id="number"
          type="text"
          name="number"
          placeholder="e.g. 1234 5678 9123 0000"
          value={cardData.number}
          onChange={handleChange}
          inputMode="numeric"
          maxLength="19"
        />

        {errors.number && (
          <p className="error">{errors.number}</p>
        )}
      </div>

      <div className="form-row">
        <div className="expiry-group">
          <label>EXP. DATE (MM/YY)</label>

          <div className="expiry-inputs">
            <div>
              <input
                type="text"
                name="month"
                placeholder="MM"
                value={cardData.month}
                onChange={handleChange}
                inputMode="numeric"
                maxLength="2"
              />

              {errors.month && (
                <p className="error">{errors.month}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="year"
                placeholder="YY"
                value={cardData.year}
                onChange={handleChange}
                inputMode="numeric"
                maxLength="2"
              />

              {errors.year && (
                <p className="error">{errors.year}</p>
              )}
            </div>
          </div>
        </div>

        <div className="cvc-group">
          <label htmlFor="cvc">CVC</label>

          <input
            id="cvc"
            type="text"
            name="cvc"
            placeholder="e.g. 123"
            value={cardData.cvc}
            onChange={handleChange}
            inputMode="numeric"
            maxLength="3"
          />

          {errors.cvc && (
            <p className="error">{errors.cvc}</p>
          )}
        </div>
      </div>

      <button type="submit">Confirm</button>
    </form>
  );
}

export default CardForm;

