import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { notes, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{notes.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(notes._id);
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(notes);
              }}
            ></i>
          </div>
          <p className="card-text">{notes.description}</p>

          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
