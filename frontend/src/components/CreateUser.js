import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    users: [],
    username: "",
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    await axios
      .get("http://localhost:4000/api/users")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  onChangeUserName = (e) => this.setState({ username: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/users", {
        username: this.state.username,
      })
      .then(() => {
        this.getUsers();
        this.setState({ username: "" });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  deleteUser = async (id) => {
    await axios
      .delete("http://localhost:4000/api/users/" + id)
      .then(() => {
        this.getUsers();
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
      this.setState({
        error: "",
      });
    }, 5000);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeUserName}
                  value={this.state.username}
                />
              </div>
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
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user) => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
