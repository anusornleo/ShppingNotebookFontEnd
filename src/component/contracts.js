import React, { Component } from "react";
import axios from "axios";
import MyCard from "./card";
import { Button, Modal } from "react-bootstrap";

class NotebookList extends Component {
  state = {
    notebooks: this.props.notebooks
  };

  constructor(props) {
    super(props);
    this.state = {
      notebooks: this.props.notebooks,
      brand: "",
      price: 0,
      del: "",
      modal: false
      // notebooks: []
    };
    this.removeNotebook = this.removeNotebook.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  load() {
    console.log("finish");
    axios.get(`http://localhost:8080/notebook`).then(res => {
      const notebooks = res.data;
      this.setState({ notebooks });
      console.log("finish");
    });
  }

  componentDidMount() {
    this.load();
  }

  removeNotebook(name, i) {
    axios
      .delete("http://localhost:8080/notebook/delete/" + name.id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err))
      .then(response => {
        console.log("Success:", response);
        this.load();
      });
  }
  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        brand: this.state.brand,
        model: this.state.model,
        price: this.state.price
      })
    })
      .then(res => {
        res.json();
        console.log(res);
      })
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log("Success:", response);
        this.load();
      });
  };

  render() {
    return (
      <div>
        <center>
          <h1>Notebook List</h1>
        </center>

        <div>
          <Button color="danger" onClick={this.toggle}>
            Open
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <Modal.Header toggle={this.toggle}>Modal title</Modal.Header>
            <Modal.Body>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Modal.Body>
            <Modal.Footer>
              <Button color="primary" onClick={this.toggle}>
                Do Something
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div>
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Brand:
              </label>
              <input
                type="text"
                class="form-control"
                id="recipient-name"
                name="brand"
                onChange={this.onChange}
              ></input>
            </div>

            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Model:
              </label>
              <input
                type="text"
                class="form-control"
                id="recipient-name"
                name="model"
                onChange={this.onChange}
              ></input>
            </div>

            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Price:
              </label>
              <input
                type="number"
                class="form-control"
                id="recipient-name"
                name="price"
                onChange={this.onChange}
              ></input>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Add
            </button>
          </form>
        </div>

        <MyCard
          notebooks={this.state.notebooks}
          removeNotebook={this.removeNotebook}
        />
      </div>
    );
  }
}

// const Contacts = ({ contacts }) => {
//   return (

//   )
// };

export default NotebookList;
