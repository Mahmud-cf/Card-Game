import React from "react";
import cover from '../assets/nevi.png'

function Card({card, handleClick, flipped, disable}) {
    const backClick = () => {
      if(!disable){
        handleClick(card)
      }
    }
  return (
    <div className="card">
      <div className={flipped ? 'turn' : ''} >
        <img src={card.src} alt="Front side" className="front" />
        <img src={cover} alt="Back side" onClick={backClick} className="back" />
      </div>
    </div>
  );
}

export default Card;
