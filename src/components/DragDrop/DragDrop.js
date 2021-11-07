import React, { useState } from "react";
import "./style.css";

const DragDrop = () => {
  const [cardList, setCardList] = useState([
    {
      id: 1,
      order: 1,
      text: "CARD1",
    },
    {
      id: 2,
      order: 2,
      text: "CARD2",
    },
    {
      id: 3,
      order: 3,
      text: "CARD3",
    },
    {
      id: 4,
      order: 4,
      text: "CARD4",
    },
  ]);
  const [currentCard, setCurrentCard] = useState(null);

  const dragStartHandler = (e, card) => {
    console.log("drag", card);
    setCurrentCard(card);
  };
  const dragEndHandler = (e) => {
    e.target.style.background = "white";
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "lightgray";
  };
  const dropHandler = (e, card) => {
    e.preventDefault();
    setCardList(
      cardList.map((i) => {
        if (i.id === card.id) {
          return { ...i, order: currentCard.order };
        }
        if (i.id === currentCard.id) {
          return { ...i, order: card.order };
        }
        return i;
      })
    );
    e.target.style.background = "white";
    console.log("drop", card);
  };

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else return -1;
  };

  return (
    <div className="drag_drop">
      {cardList.sort(sortCards).map((card) => (
        <div
          className="card"
          key={card.id}
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};

export default DragDrop;
