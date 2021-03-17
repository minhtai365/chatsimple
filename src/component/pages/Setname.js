import React, { Component } from "react";
import { auth } from "../services/firebase";

export default class Setname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.content === "") {
      this.setState({ writeError: "Dữ liệu rỗng", error: true });
    } else {
      auth().currentUser.displayName = this.state.content;
    }
    //   try {
    //     await db.ref("chats").push({
    //       content: this.state.content,
    //       timestamp: Date.now(),
    //       uid: this.state.user.uid,
    //     });
    //     this.setState({ content: "" });
    //   } catch (error) {
    //     this.setState({ writeError: error.message });
    //   }
  }
  render() {
    return (
      <div>
        <form className="center-content" onSubmit={this.handleSubmit}>
          {/* <p>Your name.</p> */}
          <input
            style={{ width: "80%" }}
            className="input-login"
            placeholder="Your name"
            name="name"
            onChange={this.handleChange}
            value={this.state.content}
          ></input>
          <button className="btn btn-login" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}
