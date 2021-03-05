import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import ExpenseTable from './ExpenseTable';
import { getExpenses, getLabels, setExpense, createExpense, setLabels } from "./fakeapi";
import MonthSelector from "./MonthSelector";
import MonthlyTotals from './MonthlyTotals';
import AddButton from "./AddButton";

function MonthView(props) {
  const [expenses, setExpenses] = useState({});
  const [currentMonth, setMonth] = useState(moment().month())

  const getExpensesFetch = (month) => new Promise((resolve) => { // TODO duplicate code
    resolve(getExpenses(month))
  })

  useEffect(() => {
    getExpensesFetch(currentMonth)
      .then(result => {
        console.info(result);
        setExpenses(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentMonth]);

  return (<>
    <Row>
      <Col>
        <h3>Monthly view for <MonthSelector current={currentMonth} onChange={(i) => setMonth(i)} /></h3>
      </Col>
    </Row>
    <Row>
      <MonthlyTotals expenses={expenses} cats={props.cats} />
    </Row>
    <hr />
    <Row>
      <Col>
        <AddButton />
        <br />
        <ExpenseTable expenses={expenses} cats={props.cats} />
      </Col>
    </Row>
  </>);
}

export default MonthView;
