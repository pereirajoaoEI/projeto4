import PropTypes from "prop-types";

const Button = ({ text, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "#0ea5e9",
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onclick: PropTypes.func,
};

export default Button;
