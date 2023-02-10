import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import "./CardList.css";
import NewCard from "./NewCard";
import axios from "axios";

const CardList = (props) => {
  if (props.selectedBoardID !== null) {
    return (
      <>
        <div>
          {props.cardsData
            .filter((card) => card.board_id === props.selectedBoardID)
            .map((card) => (
              <Card
                key={card.id}
                card_id={card.id}
                board_id={card.board_id}
                likes_count={card.likes_count}
                message={card.message}
                likeCard={props.likeCard}
                deleteCard={props.deleteCard}
              />
            ))}
        </div>
        <div>
          <NewCard addCard={props.addCard} />
        </div>
      </>
    );
  }
};

export default CardList;
