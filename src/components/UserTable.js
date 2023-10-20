import React, { Component } from 'react';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch('https://dummyjson.com/users')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.users && Array.isArray(data.users)) {
          this.setState({
            users: data.users,
            loading: false,
          });
        } else {
          console.error('User data not found in the response:', data);
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ loading: false });
      });
  }
  

  render() {
    const { users, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (users.length === 0) {
      return <p>No users found.</p>;
    }

    return (
      <table className="table table-striped table-bordered">
        <thead className='thead-dark'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Date Of Birth</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName} {user.maidenName} {user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default UserTable;
