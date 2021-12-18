import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAddTask }) => {
  const location =useLocation()

  return (
    <header class="header">
      <h1> {title}</h1>
      {location.pathname === "/" && (
      <Button
        color={showAddTask ? "red" : "green"}
        text={showAddTask ? "Close" : "Add"}
        onClick={onAdd}
      />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker"
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

// css in js
// const headingStyle = {
//   color:'red' ,
//    backgroundColor:'black'
// }
export default Header;
