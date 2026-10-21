import React from "react";

function CardPreview({ cardData }) {
  const cardNumber =
    cardData.number || "0000 0000 0000 0000";

  const cardName =
    cardData.name || "JANE APPLESEED";

  const month =
    cardData.month || "00";

  const year =
    cardData.year || "00";

  const cvc =
    cardData.cvc || "000";

  return (
    <div className="cards-container">
      <div className="credit-card front-card">
        <div className="card-top">
          <div className="card-chip"></div>

          <div className="card-logo">
            ◉
          </div>
        </div>

        <div className="card-number">
          {cardNumber}
        </div>

        <div className="card-bottom">
          <div>
            <span>CARDHOLDER NAME</span>
            <strong>{cardName}</strong>
          </div>

          <div className="expiry">
            <span>EXP. DATE</span>

            <strong>
              {month}/{year}
            </strong>
          </div>
        </div>
      </div>

      <div className="credit-card back-card">
        <div className="black-strip"></div>

        <div className="signature-area">
          <div className="signature-line"></div>

          <div className="cvc">
            {cvc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPreview;
