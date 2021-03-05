import { Dropdown } from "react-bootstrap";
import moment from "moment";
import "./MonthSelector.css";
import { formatMonth } from "./util";

function MonthSelector(props) {
  return (
    <Dropdown className="monthSelector">
      <Dropdown.Toggle variant="primary">
        {formatMonth(props.current)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          [...Array(12).keys()].map(i => (
            <Dropdown.Item onClick={() => props.onChange(i)} >{formatMonth(i)}</Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default MonthSelector;
