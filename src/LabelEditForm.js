import { Formik } from 'formik';
import { Button, Form, Modal } from "react-bootstrap";
import { CirclePicker } from 'react-color';
import { useHistory } from "react-router-dom";
import * as yup from 'yup';
import Label from "./Label";
import "./LabelEditor.css";


const schema = yup.object().shape({
  text: yup.string().required(),
  color: yup.string().required()
});


function LabelEditForm(props) {
  const history = useHistory();

  let label = {
    text: "",
    color: "#333333"
  }
  let isNew = true;

  if (props.label !== undefined) {
    label = props.label;
    isNew = false;
  }

  return <>
    <Modal show={props.showEditor} onHide={() => props.handleCloseEditor(false, label)}>
      <Formik
        initialValues={label}
        validationSchema={schema}
        onSubmit={(values) => { console.info("submit", values); props.onChange(values); history.push("/labels") }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit label</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="editorPreview">
                <Label
                  big
                  text={formik.values.text === undefined ? "" : formik.values.text}
                  colorMap={{ [formik.values.text]: { color: formik.values.color } }}
                />
              </Form.Group>
              <Form.Group controlID="editorText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.text}
                  readOnly={!isNew}
                />
              </Form.Group>
              <Form.Group controlId="editorColor">
                <Form.Label>Color</Form.Label>
                <CirclePicker
                  color={formik.values.color}
                  onChange={(e) => { formik.setFieldValue("color", e.hex); }}
                />
              </Form.Group>
              {
                !isNew ? (
                  <Form.Group controlId="deleteButton">
                    <br />
                    <Button variant="outline-danger" size="sm" block onClick={() => props.handleDelete(formik.values)}>
                      Delete
                  </Button>
                  </Form.Group>
                ) : <></>
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => props.handleCloseEditor(false, label)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => props.handleCloseEditor(true, formik.values)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>)}
      </Formik>
    </Modal>

  </>
}

export default LabelEditForm;
