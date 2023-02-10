import PropTypes from "prop-types";

const SelectedBoard = (props) => {
  let message = "Select a Board from the Board List!";
  if (props.selectedBoardData !== undefined) {
    message = `${props.selectedBoardData.title} - ${props.selectedBoardData.creator}`;
  }
  return <p>{message}</p>;
};

export default SelectedBoard;
