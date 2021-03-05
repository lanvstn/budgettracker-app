import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

const defaultCats = ["food", "basic", "hobby", "other"]

const fakeDate = (i) => {
  let date = moment("2020-10-01")
  date.add(i, "day")
  return date.format("YYYY-MM-DD")
}

const fakeCat = (i) => {
  return defaultCats[i % defaultCats.length]
}

const fakeDesc = (i) => {
  const descs = [
    "In harum voluptas",
    "",
    "Voluptates mollitia omnis.",
    "Dolorem",
    "voluptatibus ea",
    "velit ipsa quia",
    "",
    "Aut a eum et.",
    "Alias id libero",
    "consequatur sapiente."
  ]

  return descs[i % descs.length]
}

const fakeAmount = () => Number(Math.random() * 100).toFixed(2);

const fakeColor = (i) => [
  "rgba(116, 37, 0, .75)",
  "rgba(116, 108, 0, .75)",
  "rgba(81, 116, 0, .75)",
  "rgba(0, 112, 107, .75)",
  "rgba(0, 58, 112, .75)",
  "rgba(39, 0, 112, .75)",
  "rgba(112, 0, 103, .75)"
][i]

export const genMock = () => {
  const mockAmount = 365;

  let expenses = {};

  for (let i = 0; i < mockAmount; i++) {
    expenses[uuidv4()] = {
      "date": fakeDate(i),
      "cat": fakeCat(i),
      "amount": fakeAmount(),
      "desc": fakeDesc(i)
    }
  }

  return expenses
}

export const genMockCat = () => {
  const mockAmount = defaultCats.length;
  const cats = {};

  for (let i = 0; i < mockAmount; i++) {
    cats[fakeCat(i)] = {
      "text": fakeCat(i),
      "color": fakeColor(i)
    };
  }

  return cats;
}
