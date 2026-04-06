import React from 'react';
import {
  Typography
} from '@mui/material';
import './userPhotos.css';
<<<<<<< Updated upstream
=======
import axios from 'axios';
>>>>>>> Stashed changes


/**
 * Define UserPhotos, a React componment of project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Typography variant="body1">
      This should be the UserPhotos view of the PhotoShare app. Since
      it is invoked from React Router the params from the route will be
      in property match. So this should show details of user:
      {this.props.match.params.userId}. You can fetch the model for the user from
      window.models.photoOfUserModel(userId):
        <Typography variant="caption">
          {JSON.stringify(window.models.photoOfUserModel(this.props.match.params.userId))}
        </Typography>
      </Typography>

<<<<<<< Updated upstream
    );
  }
=======
    handleUserChange(user_id){
        axios.get("/photosOfUser/" + user_id)
            .then((response) =>
            {
                this.setState({
                    user_id : user_id,
                    photos: response.data
                });
            });
        axios.get("/user/" + user_id)
            .then((response) =>
            {
                const new_user = response.data;
                const main_content = "User Photos for " + new_user.first_name + " " + new_user.last_name;
                this.props.changeMainContent(main_content);
            });
    }

    render() {
        return this.state.user_id ? (
            <div>
                <div>
                    <Button variant="contained" component="a" href={"#/users/" + this.state.user_id}>
                        User Detail
                    </Button>
                </div>
                <ImageList variant="masonry" cols={1} gap={8}>
                    {this.state.photos.map((item) => (
                        <div key={item._id}>
                            <TextField id="date" label="Photo Date" variant="outlined" disabled fullWidth margin="normal"
                                       value={item.date_time} />
                            <ImageListItem key={item.file_name}>
                                <img
                                    src={`images/${item.file_name}`}
                                    srcSet={`images/${item.file_name}`}
                                    alt={item.file_name}
                                    loading="lazy"
                                />
                            </ImageListItem>
                            {item.comments ?
                                item.comments.map((comment) => (
                                    <div key={comment._id}>
                                        <TextField id="date" label="Comment Date" variant="outlined" disabled fullWidth
                                                   margin="normal" value={comment.date_time} />
                                        <TextField id="user" label="User" variant="outlined" disabled fullWidth
                                                   margin="normal"
                                                   value={comment.user.first_name + " " + comment.user.last_name}
                                                   component="a" href={"#/users/" + comment.user._id}>
                                        </TextField>
                                        <TextField id="comment" label="Comment" variant="outlined" disabled fullWidth
                                                   margin="normal" multiline rows={4} value={comment.comment} />
                                    </div>
                                ))
                                : (
                                    <div>
                                        <TextField id="comment" label="No Comments" variant="outlined" disabled fullWidth
                                                   margin="normal" />
                                    </div>
                                )}
                        </div>
                    ))}
                </ImageList>
            </div>
        ) : (
            <div/>
        );
    }
>>>>>>> Stashed changes
}
export default UserPhotos;
