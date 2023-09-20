import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const DeleteModal = ({ url, show }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    setShow(false);
  };

  return <></>;
};
