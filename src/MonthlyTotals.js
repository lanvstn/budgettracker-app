import { useMemo } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { Col } from "react-bootstrap";
import { formatCurrency } from "./util";
import Label from "./Label";
import { totals } from "./util";


function MonthlyTotals(props) {
  // Doesn't recalculate totals on every render
  const calculatedTotals = useMemo(() => totals(props.expenses), [props.expenses]);

  return <>
    <Col>
      <p>
        <strong>Total: {formatCurrency(calculatedTotals.reduce((sum, [_, subtotal]) => subtotal + sum, 0))}</strong>
      </p>
      <ul>
        {
          calculatedTotals.map(([cat, value]) => (
            <li key={cat}><Label text={cat} colorMap={props.cats} /> <em>{formatCurrency(value)}</em></li>
          ))
        }
      </ul>
    </Col>
    <Col xs={5}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width="100%" height="100%">
          <Pie
            data={calculatedTotals.map(([cat, value]) => (
              {
                cat: cat,
                value: value,
                formattedValue: formatCurrency(value)
              }
            ))}
            dataKey="value"
            innerRadius="40%"
          >
            <LabelList dataKey="cat" position="outside" />
            {
              calculatedTotals.map(([cat, _]) => (
                <Cell key={cat} fill={props.cats[cat]?.color} dataKey="value"></Cell>
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>

    </Col>
  </>
}

export default MonthlyTotals;
