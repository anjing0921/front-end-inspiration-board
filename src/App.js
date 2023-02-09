import React, { useState, useEffect } from "react";
import "./App.css";
import BoardsDropDown from "./components/boards/BoardsDropDown";
import SelectedBoard from "./components/boards/SelectedBoard";
import NewBoardForm from "./components/boards/NewBoardForm";
import axios from "axios";
import CardList from "./components/cards/CardList";
import ShowCard from "./components/cards/ShowCard";

// ~~~~~~ Helper Functions ~~~~~~
// Function for sending get requests
const getAllBoards = () => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.response.data.message);
    });
};
// Function for sending post requests
const registerNewBoard = (newBoard) => {
  // create request body
  const requestBody = {
    ...newBoard,
  };
  console.log(requestBody);
  // send post request
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
};

function App() {
  // ~~~~~~ boards data ~~~~~~
  const [boardsData, setBoardsData] = useState([]);
  // function to make get request whenever boardsData gets modified
  useEffect(() => {
    getAllBoards().then((boards) => {
      setBoardsData(boards);
    });
  }, []);
  // function to update boards data state upon submission
  const updateBoardsData = (newBoard) => {
    // make a post request to the backend
    registerNewBoard(newBoard);
    // change the boardsData state
    const newBoardsData = [...boardsData];
    // find next valid board id
    const nextID = Math.max(...newBoardsData.map((board) => board.id)) + 1;
    // update the boards data state with new board
    newBoardsData.push({
      id: nextID,
      title: newBoard.title,
      creator: newBoard.creator,
    });
    setBoardsData(newBoardsData);
  };

  // state to track selected board id
  const [selectedBoardID, setSelectedBoard] = useState(0);
  // function to update selected board state id
  const updateSelectedBoard = (selectedBoardElementID) => {
    setSelectedBoard(selectedBoardElementID);
  };

  return (
    <main className="App">
      <header className="App-header">
        <h1>CheerUp Inspiration Board</h1>
      </header>
      <section>
        <header>
          <h3>Boards</h3>
        </header>
        <BoardsDropDown
          boardsData={boardsData}
          updateSelectedBoard={updateSelectedBoard}
        ></BoardsDropDown>
        <header>
          <h3>Selected Board</h3>
        </header>
        <SelectedBoard
          selectedBoardID={selectedBoardID}
          boardsData={boardsData}
        ></SelectedBoard>
        <header>
          <h3>Create a New Board</h3>
        </header>
        <NewBoardForm updateBoardsData={updateBoardsData}></NewBoardForm>
      </section>
      {/* <ShowCard /> */}
      {/* <CardList
        selectedBoard={selectedBoard}
        cardsData={cardsData}
        likeCard={likeCard}
        deleteCard={deleteCard}
        addCard={addCard}
        getBoardCards={getBoardCards}
      /> */}
      <footer>
        <h4>Made by Anna, Larissa, Melody, Supriya </h4>
      </footer>
    </main>
  );
}

export default App;
