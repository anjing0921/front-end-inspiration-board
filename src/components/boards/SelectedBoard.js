import PropTypes from "prop-types";

const SelectedBoard = (props) => {
  // state to track selected board display message
  let message = "Select a Board from the Board List!";
  //if a board is selected
  if (props.selectedBoardID !== 0) {
    // find the corresponding board to selectedBoardID
    const selectedBoard = props.boardsData.filter(
      (board) => board.id === props.selectedBoardID
    );
    message = `${selectedBoard[0].title} - ${selectedBoard[0].creator}`;
  }
  // update the message state
  return <p>{message}</p>;
};

SelectedBoard.propTypes = {
  boardsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
    })
  ),
  selectedBoardID: PropTypes.number.isRequired,
};

export default SelectedBoard;
