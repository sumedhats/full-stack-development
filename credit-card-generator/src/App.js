import React, { useState } from "react";
import "./App.css";

import CardPreview from "./components/CardPreview";
import CardForm from "./components/CardForm";
import SuccessMessage from "./components/SuccessMessage";

function App() {
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (data) => {
    setCardData(data);
    setSuccess(true);
  };

  return (
    <div className="app">
      <div className="card-section">
        <CardPreview cardData={cardData} />
      </div>

      <div className="form-section">
        {!success ? (
          <CardForm
            cardData={cardData}
            setCardData={setCardData}
            onSubmit={handleSubmit}
          />
        ) : (
          <SuccessMessage />
        )}
      </div>
    </div>
  );
}

export default App;