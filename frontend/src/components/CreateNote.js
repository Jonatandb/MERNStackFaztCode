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
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data.map((u) => u.username) });
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDateChange = (date) => {
    this.setState({ date });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
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
      </div>
    );
  }
}
