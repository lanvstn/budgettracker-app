import React from "react";
import moment from "moment";
import { Form, Button } from "react-bootstrap";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  cat: yup.string().required(),
  amount: yup.number().required().positive(),
  date: yup.date().default(() => moment().format("YYYY-MM-DD")),
  desc: yup.string(),
});

// https://react-bootstrap.github.io/components/forms/#forms-validation-libraries

function ExpenseEditor(props) {
  const history = useHistory();

  let expense = {
    "cat": "",
    "amount": 0,
    "date": moment().format("YYYY-MM-DD"),
    "desc": ""
  };

  if (props.expense !== undefined) {
    expense = props.expense;
  }

  return (
    <Formik
      initialValues={expense}
      validationSchema={schema}
      onSubmit={(values) => { console.info("submit", values); props.onChange(values); history.push("/") }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="editorDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
            />
          </Form.Group>
          <Form.Group controlId="editorCat">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="cat"
              value={values.cat}
              onChange={handleChange}
              isInvalid={!!errors.cat}
            />
          </Form.Group>
          <Form.Group controlId="editorAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              isInvalid={!!errors.amount}
            />
            {/* <ErrorMessage name="amount" /> */}
          </Form.Group>
          <Form.Group controlId="editorAmount">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="desc"
              placeholder="optional description"
              value={values.desc}
              onChange={handleChange}
              isInvalid={!!errors.desc}
            />
          </Form.Group>
          <Button variant="primary" type="submit">{props.expense !== undefined ? "modify" : "add"}</Button>
        </Form>
      )}
    </Formik>
  );
}

export default ExpenseEditor;
