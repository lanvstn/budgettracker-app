import { Modal } from "react-bootstrap"

function Error(props) {
  return (
    <Modal
      show={true}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>⚠ An error occured</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.msg}</p>
      </Modal.Body>
    </Modal>
  );
}

export default Error;
