import { useHistory } from "react-router-dom";
import Label from "./Label";
import moment from "moment";
import { formatCurrency } from "./util";


function EntryRow(props) {

  const history = useHistory();

  return <tr key={props.id} onClick={() => { history.push(`/edit/${props.id}`) }}>
    <td>{moment(props.expense.date).format("ddd D MMM YYYY")}</td>
    <td>{formatCurrency(props.expense.amount)}</td>
    <td><Label text={props.expense.cat} colorMap={props.cats} /> {props.expense.desc}</td>
  </tr>
}

export default EntryRow;
