import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
}
from '@mui/material';
import './userList.css';
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of project #5
 */
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                users: undefined,
                user_id: undefined
            };
    }

    componentDidMount() {
        this.handleUserListChange();
    }

    componentDidUpdate() {
        const new_user_id = this.props.match?.params.userId;
        const current_user_id = this.state.user_id;
        if (current_user_id  !== new_user_id){
            this.handleUserChange(new_user_id);
        }
    }

    handleUserChange(user_id){
        this.setState({
            user_id: user_id
        });
    }

    handleUserListChange(){
        fetchModel("/user/list")
            .then((response) =>
            {
                this.setState({
                    users: response.data
                });
            });
    }

  render() {
     return this.state.users ? (
    <div className="user-list-container">
      
      <div className="user-list-header">
        Users
      </div>

      <List component="nav">
        {this.state.users.map((user) => (
          <ListItemButton
            key={user._id}
            selected={this.state.user_id === user._id}
            divider
            component="a"
            href={"#/users/" + user._id}
            className="user-list-item"
          >
            <ListItemText
              primary={user.first_name + " " + user.last_name}
              className="user-list-text"
            />
          </ListItemButton>
        ))}
      </List>
      
    </div>
  ) : (
    <div className="user-list-container" />
    );
  }
}

export default UserList;
