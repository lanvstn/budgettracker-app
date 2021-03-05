import React from "react"
import { Button, Modal } from "react-bootstrap"
import ExpenseEditor from "./ExpenseEditor"

function ExpenseEditorModal(props) {
  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Edit expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ExpenseEditor />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Close
          </Button>
        <Button variant="primary" onClick={null}>
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExpenseEditorModal;
