import { Button, Col } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Label from "./Label";
import LabelEditForm from "./LabelEditForm";
import "./LabelEditor.css";
import { setLabel } from "./fakeapi";


function LabelEditor(props) {
  const history = useHistory();

  const [showEditor, setShowEditor] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState();

  const handleCloseEditor = (save, label) => {
    if (save) {
      props.onChange({ ...props.cats, [label.text]: label });
    }
    setShowEditor(false);
  };

  const handleShowEditor = (cat) => {
    setSelectedLabel(cat);
    setShowEditor(true);
  };

  const handleDelete = (cat) => {
    const modifiedCats = Object.fromEntries(
      Object.entries(props.cats)
        .filter(([k, v]) => k !== cat.text)
    );

    props.onChange(modifiedCats);
    setShowEditor(false);
  }

  return <>
    <LabelEditForm
      showEditor={showEditor}
      handleCloseEditor={handleCloseEditor}
      handleDelete={handleDelete}
      label={selectedLabel}
    />

    <h2>Labels</h2>
    <p>You can edit labels here by clicking on them.</p>
    {
      Object.entries(props.cats).map(([cat, _]) => <>
        <Label
          big
          text={cat}
          colorMap={props.cats}
          onClick={() => handleShowEditor(props.cats[cat])}
        />
        <span> {/*spacing*/}</span>
      </>)
    }
    <Button variant="add-transparent" onClick={() => handleShowEditor()}>+</Button>
  </>
}

export default LabelEditor;
