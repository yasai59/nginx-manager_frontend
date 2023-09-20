import { Button, Card, Modal } from "react-bootstrap";
import "./site.css";
import { useState } from "react";
import axios from "axios";

export const Site = ({
  // example of a site, (and for autocomplete in vscode :P)
  site = {
    id: "1",
    title: "My site",
    url: "https://example.com",
    type: "example",
    ip: "ip",
    port: "port",
  },
  update,
}) => {
  const openSite = (url) => {
    var win = window.open(url, "_blank");
    win.focus();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleDel = () => {
    // TODO: Esto es una pedazo de chapuza, hay que cambiarlo pero ahora me da todo el palo
    axios
      .delete("/api/sites", {
        data: {
          id: site.id,
        },
      })
      .then((res) => {
        setTimeout(() => {
          update();
        }, 500);
      });
    setShow(false);
  };

  const deleteSite = () => {
    setShow(true);
  };
  return (
    <>
      <Card className="site">
        <Card.Body>
          <h3>{site.title}</h3>
          <div className="url">
            <input type="text" value={site.url} />
            <div>
              <Button
                variant="outline-primary"
                onClick={() => openSite("http://" + site.url)}
              >
                Visit
              </Button>
            </div>
          </div>
          <p>Type: {site.type}</p>
          {site.type === "proxy" ? (
            <>
              <div className="inputs">
                <p>IP: </p>
                <input type="text" value={site.ip} />
              </div>
              <div className="inputs">
                <p>Port: </p>
                <input type="text" value={site.port} />
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="buttons">
            <Button
              variant="outline-danger"
              className="deleteButton"
              onClick={deleteSite}
            >
              Delete
            </Button>
            <Button variant="outline-success" className="saveButton">
              Save changes
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete {site.title}? this action can't
          be undone
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDel}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
