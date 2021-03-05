import { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import moment from "moment";
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { getLabels, setExpense, createExpense, setLabels, getExpensesYear } from "./fakeapi";
import { totals, formatMonth, formatCurrency } from "./util";


const getExpensesYearFetch = (year) => new Promise((resolve) => { // TODO duplicate code
  resolve(getExpensesYear(year))
})

function YearView(props) {
  const [expenses, setExpenses] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getExpensesYearFetch(moment().year())
      .then(result => {
        console.info(result);
        setExpenses(result);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  if (!loaded) {
    return null;
  }

  const defaults =
    Object.keys(props.cats).map(cat => (
      {
        [cat]: 0
      }
    )).reduce((prev, curr) => ({ ...prev, ...curr }), {});


  if (defaults.length === 0) {
    return null;
  }

  // Aggregate by month
  const allByMonth = [...Array(12)].map(() => ({}));
  Object.entries(expenses).forEach(([key, expense]) => {
    const month = moment(expense.date).month();
    allByMonth[month][key] = expense;
  })

  const totalsByMonth = allByMonth
    .map(expensesInMonth => totals(expensesInMonth))
    .map((totalsByMonth, idx) => ({ ...defaults, ...{ ...Object.fromEntries(totalsByMonth), monthName: formatMonth(idx, "MMM") } }));

  console.log(totalsByMonth);
  // const transformedTotalsByMonth =

  // const transformedTotalsByMonth = []
  //   {
  //     month: formatMonth(month),
  //     totals: totals === undefined ? ({}) : ([totals].map(([cat, value]) => ({
  //       cat: cat,
  //       value: value
  //       // formattedValue: formatCurrency(value)
  //     })))
  //   }
  // ));
  // Object.values(props.cats).map((cat) => { alert(JSON.stringify(cat)) });

  return (<>
    <Row>
      <Col>
        <h3>Yearly view</h3>
      </Col>
    </Row>
    {/* <Row>
      <ul>
        {
          totalsByMonth.map((item, idx) => (
            <li key={idx}>{formatMonth(idx)}
              <ul>
                {
                  item.map(([cat, sum]) => (
                    <li>{cat}: {sum}</li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </ul>
    </Row>  */}
    <hr />
    <Row>
      <Col>
        <ResponsiveContainer height={400}>
          <AreaChart
            // width={1000}
            // height={1000}
            data={totalsByMonth}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthName" tickCount={12} interval={0} />
            <YAxis tickFormatter={(num) => formatCurrency(num, 0)} />
            <Tooltip formatter={(num) => formatCurrency(num)} />
            {
              Object.values(props.cats).map((cat) => (
                <Area key={cat.text} type="monotone" dataKey={cat.text} stackId="1" stroke={cat.color} fill={cat.color} />
              ))
            }
          </AreaChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  </>)
}

export default YearView;
