import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

import { genMock, genMockCat } from './mock';


function populateStorage() {
  if (localStorage.getItem("populated")) {
    return;
  }

  localStorage.setItem("expenses", JSON.stringify(genMock()));
  localStorage.setItem("labels", JSON.stringify(genMockCat()));
  localStorage.setItem("populated", true);
}

function getAllExpenses() {
  populateStorage();
  return JSON.parse(localStorage.getItem("expenses"));
}

export function getExpenses(month) {
  const filterResult = Object.entries(getAllExpenses())
    .filter(([_, expense]) => moment(expense.date).month() === month);
  return Object.fromEntries(filterResult);
}

export function getExpensesYear(year) {
  const filterResult = Object.entries(getAllExpenses())
    .filter(([_, expense]) => moment(expense.date).year() === year);
  return Object.fromEntries(filterResult);
}

export function getLabels() {
  populateStorage();
  return JSON.parse(localStorage.getItem("labels"));
}

// Write functions here are NOT safe for concurrent use even though they should

export function createExpense(expense) {
  const id = uuidv4();
  localStorage.setItem("expenses", JSON.stringify({ ...getAllExpenses(), [id]: expense }));
  return id;
}

export function setExpense(id, expense) {
  localStorage.setItem("expenses", JSON.stringify({ ...getAllExpenses(), [id]: expense }));
}

export function deleteExpense(id) {
  const expenses = getAllExpenses();
  delete expenses[id];
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

export function setLabels(labels) {
  localStorage.setItem("labels", JSON.stringify(labels));
}
