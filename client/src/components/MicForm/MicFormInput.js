import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const MicFormInput = props => (
  <FormGroup>
    <Label for={props.field}>
      {props.label}
      <span className="asterisk">&nbsp;*</span>
    </Label>

    <Input
      //{...props}
      onChange={props.handleInputChange}
      value={props.micInfo[props.field]}
      type="text"
      name={props.field}
      id={props.field}
    />
  </FormGroup>
);

export default MicFormInput;
