import React, { Component } from "react";

class Card extends Component {
    removeItem(notebook , i) {
      this.props.removeNotebook(notebook,i)
  }

  render() {
    return this.props.notebooks.map((notebook, i) => {
      return (
        <div className="card" key={i}>
          <div className="card-body">
            <h5 className="card-title">{notebook.id}</h5>
            {/* <h6 class="card-subtitle mb-2 text-muted">{contact.title}</h6> */}
            <p className="card-text">{notebook.brand} {notebook.model}</p>
            <button onClick={() => { this.removeItem(notebook, i)}} className="btn btn-danger">Delete</button>
          </div>
        </div>
      );
    });
  }
}

export default Card;
