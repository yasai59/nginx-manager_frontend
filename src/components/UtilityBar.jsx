import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export const UtilityBar = () => {
  return (
    <InputGroup>
      <Button variant="outline-secondary">Button</Button>
      <Form.Control
        placeholder="Recipient's username"
        aria-label="Recipient's username with two button addons"
      />
      <Button variant="outline-secondary">Button</Button>
    </InputGroup>
  );
};
