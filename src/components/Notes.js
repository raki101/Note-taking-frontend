import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const ref = useRef(null);
  const closeRef = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("updating note ..", note);
    // const { id, etitle, edescription, etag } = note;
    editNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="row my-3">
      <h1>Add a note</h1>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update item
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {notes.length > 0 ? (
        notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} notes={note} />
          );
        })
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
};

export default Notes;
