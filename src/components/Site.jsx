import { Button, Card, Modal } from "react-bootstrap";
import "./site.css";
import { useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

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

  const [display, setDisplay] = useState(site);

  const deleteSite = () => {
    setShow(true);
  };

  const saveChanges = () => {
    axios
      .put("/api/sites", {
        id: site.id,
        title: display.title,
        url: display.url,
        type: display.type,
        ip: display.ip,
        port: display.port,
      })
      .then((res) => {
        setTimeout(() => {
          update();
        }, 500);
      });
  };

  const handleChange = (files) => {
    console.log(files);
  };
  return (
    <>
      <Card className="site">
        <Card.Body>
          <h3>{site.title}</h3>
          {site.url !== display.url ||
          site.ip !== display.ip ||
          site.port !== display.port ? (
            <p style={{ color: "orange" }}>Hay cambios sin guardar!</p>
          ) : (
            <></>
          )}
          <div className="url">
            <input
              type="text"
              value={display.url}
              onChange={(input) =>
                setDisplay((value) => {
                  return { ...value, url: input.target.value };
                })
              }
            />
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
                <input
                  type="text"
                  value={display.ip}
                  onChange={(input) =>
                    setDisplay((value) => {
                      return { ...value, ip: input.target.value };
                    })
                  }
                />
              </div>
              <div className="inputs">
                <p>Port: </p>
                <input
                  type="text"
                  value={display.port}
                  onChange={(input) =>
                    setDisplay((value) => {
                      return { ...value, ip: input.target.value };
                    })
                  }
                />
              </div>
            </>
          ) : (
            <></>
          )}
          <FileUploader
            handleChange={handleChange}
            onDrop={handleChange}
            name="file"
            multiple={true}
          />
          <div className="buttons">
            <Button
              variant="outline-danger"
              className="deleteButton"
              onClick={deleteSite}
            >
              Delete
            </Button>
            <Button
              variant="outline-success"
              className="saveButton"
              onClick={saveChanges}
            >
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
