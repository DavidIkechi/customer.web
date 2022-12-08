import React from "react";
import axios from "axios";

export default class PersonList extends React.Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  render() {
    return (
      <section>
        <ul>
          {this.state.persons.map((person) => (
            <li key={person.id}>{person.company.bs}</li>
          ))}
        </ul>
      </section>
    );
  }
}
