import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { NavLink, Route, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import moment from "moment";
import './App.css';
import Error from "./Error";
import ExpenseEditor from './ExpenseEditor';
import MonthlyTotals from './MonthlyTotals';
import ExpenseTable from './ExpenseTable';
import LabelEditor from "./LabelEditor";
import MonthView from "./MonthView";
import YearView from "./YearView";
import { getExpenses, getLabels, setExpense, createExpense, setLabels } from "./fakeapi";


const getExpensesFetch = (month) => new Promise((resolve) => {
  resolve(getExpenses(month))
})

const getLabelsFetch = () => new Promise((resolve) => {
  resolve(getLabels())
})

function App(props) {
  const [expenses, setExpenses] = useState({});
  const [cats, setCats] = useState({});
  const history = useHistory();

  useEffect(() => {
    getExpensesFetch(moment().month())
      .then(result => {
        console.info(result);
        setExpenses(result);
      })
      .catch((error) => {
        console.error(error);
      });

    getLabelsFetch()
      .then(result => {
        console.info(result);
        setCats(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  const updateExpense = (id, expense) => {
    // Ensure we have a number. The form can pass a string here.
    // If this is not done then js will interpret the string as
    // a huge number instead of parsing it...
    expense.amount = Number(expense.amount);
    setExpense(id, expense)
    setExpenses(prevExpenses => ({ ...prevExpenses, [id]: expense }));
  }

  const createExpenseState = (expense) => {
    expense.amount = Number(expense.amount);
    const id = createExpense(expense);
    setExpenses(prevExpenses => ({ ...prevExpenses, [id]: expense }));
  }

  const updateLabels = (labels) => {
    setLabels(labels);
    setCats(labels);
  }

  // if (error) {
  //   return (<Error msg={error} />);
  // }

  return (<>
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Budget tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav >
            <Nav.Link><NavLink exact to="/" activeClassName="navActive">Monthly view</NavLink></Nav.Link>
            <Nav.Link><NavLink exact to="/year" activeClassName="navActive">Yearly view</NavLink></Nav.Link>
            <Nav.Link><NavLink exact to="/labels" activeClassName="navActive">Edit labels</NavLink></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mainContainer" fluid="sm">
        <Switch>
          <Route path="/edit/:id" >
            {
              (props) => (
                <ExpenseEditor
                  expense={expenses[props.match.params.id]}
                  onChange={(expense) => { updateExpense(props.match.params.id, expense); }}
                />)
            }
          </Route>
          <Route path="/new" >
            <ExpenseEditor
              onChange={(expense) => { createExpenseState(expense); }}
            />
          </Route>
          <Route path="/labels" >
            <LabelEditor
              cats={cats}
              onChange={(cats) => { updateLabels(cats); }}
            />
          </Route>
          <Route path="/year">
            <YearView cats={cats} />
          </Route>
          <Route path="/">
            <MonthView cats={cats} />
          </Route>
        </Switch>
      </Container>
    </Router>
    <footer>
      <hr />
      <center>
        <p><span className="demoWarning">demo app - data is only stored in your browser!</span>
          <br />
        made with ☕ by Lander</p></center>
    </footer>
  </>);
}

export default App;
