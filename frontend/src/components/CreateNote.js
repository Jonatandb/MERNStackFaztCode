import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    users: [],
    selectedUser: "",
    title: "",
    content: "",
    date: new Date(),
  };

  getUsers = async () => {
    await axios
      .get("http://localhost:4000/api/users")
      .then((res) => {
        this.setState({
          users: res.data.map((u) => u.username),
          selectedUser: res.data[0].username,
        });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDateChange = (date) => {
    this.setState({ date });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.selectedUser,
      date: this.state.date,
    };
    await axios
      .post("http://localhost:4000/api/notes", newNote)
      .then((res) => {
        window.location = "/";
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
    this.getUsers();
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>

          <div className="form-group">
            <select
              className="form-control"
              name="selectedUser"
              onChange={this.onInputChange}
              value={this.state.selectedUser}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              required
              value={this.state.title}
              onChange={this.onInputChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              placeholder="Content"
              required
              onChange={this.onInputChange}
              value={this.state.content}
            ></textarea>
          </div>

          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onDateChange}
            />
          </div>

          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
        {this.state.error && (
          <div className="alert alert-danger m-2" role="alert">
            {JSON.stringify(this.state.error.message)}
          </div>
        )}
      </div>
    );
  }
}
