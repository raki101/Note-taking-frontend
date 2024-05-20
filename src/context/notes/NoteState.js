import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const localhost = "http://localhost:3001";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  const getNote = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("No token found. Please authenticate.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/notes/fetchnotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        // Handle non-200 responses
        throw new Error(
          "Failed to fetch notes, server responded with an error"
        );
      }

      const json = await response.json();
      // console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  // const getNote = async () => {
  //   try {
  //     const response = await fetch(`${localhost}/api/notes/fetchnotes`, {
  //       method: "GET",
  //       headers: {
  //         // "auth-token":
  //         //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MzE4MTc0YzM1ZmY1MWI4MGM2YzVkIn0sImlhdCI6MTcxNTY3MzExMX0.qmCdmWsv_1lj_gWhyZQ4HydIX6TmMmVWM_n8MijeUO8",

  //         "Content-Type": "application/json",

  //         "auth-token": localStorage.getItem("token"),
  //       },
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //     setNotes(json);
  //   } catch (error) {
  //     console.error("Failed to fetch notes:", error);
  //   }
  // };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${localhost}/api/notes/addnote`, {
        method: "POST",
        headers: {
          // "auth-token":
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MzE4MTc0YzM1ZmY1MWI4MGM2YzVkIn0sImlhdCI6MTcxNTY3MzExMX0.qmCdmWsv_1lj_gWhyZQ4HydIX6TmMmVWM_n8MijeUO8",

          "Content-Type": "application/json",

          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      console.log(note);
      setNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${localhost}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          // "auth-token":
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MzE4MTc0YzM1ZmY1MWI4MGM2YzVkIn0sImlhdCI6MTcxNTY3MzExMX0.qmCdmWsv_1lj_gWhyZQ4HydIX6TmMmVWM_n8MijeUO8",

          "Content-Type": "application/json",

          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      console.log(json);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${localhost}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          // "auth-token":
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MzE4MTc0YzM1ZmY1MWI4MGM2YzVkIn0sImlhdCI6MTcxNTY3MzExMX0.qmCdmWsv_1lj_gWhyZQ4HydIX6TmMmVWM_n8MijeUO8",

          "Content-Type": "application/json",

          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log(json);

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
