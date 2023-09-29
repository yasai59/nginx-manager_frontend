import { useRef, useState } from "react";
import "./fileUploader.css";
import axios from "axios";

export const FileUploader = ({ site }) => {
  const drag = useRef();

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    console.log(e.dataTransfer.files);
  };

  // send data to server
  const sendData = (files) => {
    const data = {
      id: site,
      files,
    };

    axios;
  };

  return (
    <div
      className="fileUploader"
      style={{
        backgroundColor: dragActive
          ? "rgba(0, 255, 255, 0.267)"
          : "transparent",
      }}
      onDrop={handleDrop}
    >
      <input type="file" multiple={true} id={site} />
      <label htmlFor={site} className="labelDrag" ref={drag}>
        <div
          className="dragnDrop"
          onDragOver={handleDrag}
          onDragLeave={handleDragLeave}
        >
          <p>Upload files!</p>
        </div>
      </label>
    </div>
  );
};
