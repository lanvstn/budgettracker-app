import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


function AddButton(props) {
  const history = useHistory();

  return <Button block size="sm" variant="add" color="primary" onClick={() => { history.push("/new") }}>+</Button>
}

export default AddButton
