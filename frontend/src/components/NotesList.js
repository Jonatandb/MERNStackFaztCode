import React, { Component } from "react";
import axios from "axios";
import "css-tooltip/dist/css-tooltip.min.css";
import FormattedDate from "./FormattedDate";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  state = {
    notes: [],
  };

  getNotes = async () => {
    await axios
      .get("http://localhost:4000/api/notes")
      .then((res) => {
        this.setState({ notes: res.data });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  setError = (err) => {
    this.setState({
      error: {
        message: "An error has occurred. Unable to perform the operation.",
      },
    });
    console.log(JSON.stringify(err));
    setTimeout(() => {
      this.setState({ error: "" });
    }, 5000);
  };

  componentDidMount() {
    this.getNotes();
  }

  deleteNote = async (id) => {
    await axios
      .delete("http://localhost:4000/api/notes/" + id)
      .then((result) => {
        this.getNotes();
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  render() {
    return (
      <div className="row">
        {this.state.notes.map((note) => (
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{note.title}</h5>
                <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                  Edit
                </Link>
              </div>
              <div className="card-body">
                <p>{note.content}</p>
              </div>
              <div className="card-footer">
                <div className="blockquote-footer m-2">
                  By <i>{note.author}</i>{" "}
                  <span data-tooltip={note.date && note.date}>
                    <FormattedDate date={note.date} />
                  </span>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => this.deleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {this.state.error && (
          <div className="modal-dialog modal-sm">
            <div className="alert alert-danger m-2" role="alert">
              {JSON.stringify(this.state.error.message)}
            </div>
          </div>
        )}
      </div>
    );
  }
}
