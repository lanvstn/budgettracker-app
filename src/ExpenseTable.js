import { Table } from "react-bootstrap";
import moment from "moment";
import EntryRow from "./EntryRow";

function ExpenseTable(props) {
  return <Table striped bordered hover>
    <thead>
      <tr>
        <th>Date</th>
        <th>Amount</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {
        Object.entries(props.expenses)
          .sort(([_aId, a], [_bId, b]) => moment(a.date) > moment(b.date) ? 0 : 1)
          .map(([id, expense]) => (
            <EntryRow id={id} expense={expense} cats={props.cats} />
          ))
      }
    </tbody>
  </Table>
}

export default ExpenseTable;
