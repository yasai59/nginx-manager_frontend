import axios from "axios";
import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

export const UtilityBar = ({ setSearch, search, update }) => {
  const [show, setShow] = useState(false);
  const [proxy, setProxy] = useState(true);

  const [siteName, setSiteName] = useState("");
  const [siteURL, setSiteURL] = useState("");
  const [siteIP, setSiteIP] = useState("");
  const [sitePort, setSitePort] = useState("");

  const changeType = (e) => {
    if (e.target.value === "proxy") {
      setProxy(true);
    } else {
      setProxy(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setProxy(true);

    setSiteName("");
    setSiteURL("");
    setSiteIP("");
    setSitePort("");
  };

  const handleAdd = () => {
    axios
      .post("/api/sites", {
        title: siteName,
        url: siteURL,
        type: proxy ? "proxy" : "local",
        ip: siteIP,
        port: sitePort,
      })
      .then(() => {
        setTimeout(() => {
          update();
        }, 500);
      });

    setShow(false);
    setProxy(true);

    setSiteName("");
    setSiteURL("");
    setSiteIP("");
    setSitePort("");
  };

  return (
    <>
      <InputGroup>
        <Button
          variant="outline-secondary"
          onClick={() => {
            setShow(true);
          }}
        >
          Add a site
        </Button>
        <Form.Control
          placeholder="Search a site..."
          aria-label="Search Bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      {/* Confirmation Menú */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group>
              <Form.Label>Site name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter site name"
                onChange={(e) => setSiteName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Site URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter site URL"
                onChange={(e) => setSiteURL(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Site type</Form.Label>
              <Form.Control as="select" onChange={changeType}>
                <option>proxy</option>
                <option>static</option>
              </Form.Control>
            </Form.Group>
            {proxy ? (
              <>
                <Form.Group>
                  <Form.Label>Site IP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter site IP"
                    onChange={(e) => setSiteIP(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Site port</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter site port"
                    onChange={(e) => setSitePort(e.target.value)}
                  />
                </Form.Group>
              </>
            ) : (
              <></>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add site
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
