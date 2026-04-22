import React from 'react';
import {
    AppBar, Toolbar, Typography, Button
} from '@mui/material';
import './TopBar.css';
import axios from 'axios';

/**
 * Define TopBar, a React component of project #5
 */
class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app_info: undefined
        };
        this.uploadInput = null;
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUploadButtonClicked = this.handleUploadButtonClicked.bind(this);
    }

    componentDidMount() {
        this.handleAppInfoChange();
    }

    handleAppInfoChange() {
        if (this.state.app_info === undefined) {
            axios.get("/test/info")
                .then((response) => {
                    this.setState({
                        app_info: response.data
                    });
                });
        }
    }

    handleLogout() {
        axios.post("/admin/logout")
            .then(() => {
                this.props.changeUser(undefined);
            })
            .catch(err => console.log(err));
    }

    handleUploadButtonClicked(e) {
        e.preventDefault();
        if (this.uploadInput && this.uploadInput.files.length > 0) {
            const domForm = new FormData();
            domForm.append('uploadedphoto', this.uploadInput.files[0]);
            axios.post('/photos/new', domForm)
                .then(() => {
                    // Trigger a re-render of photos if needed
                    window.location.reload();
                })
                .catch(err => console.log(`POST ERR: ${err}`));
        }
    }

    render() {
        return this.state.app_info ? (
            <AppBar className="topbar-appBar" position="absolute">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Luna Stevens
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} color="inherit">
                        {this.props.main_content}
                    </Typography>
                    <Typography variant="h5" component="div" color="inherit" sx={{ mr: 2 }}>
                        Version: {this.state.app_info.version}
                    </Typography>
                    {this.props.user ? (
                        <>
                            <Typography variant="h6" component="div" color="inherit" sx={{ mr: 2 }}>
                                Hi {this.props.user.first_name}
                            </Typography>
                            <label htmlFor="upload-photo-input">
                                <input
                                    id="upload-photo-input"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={(domFileRef) => { this.uploadInput = domFileRef; }}
                                    onChange={this.handleUploadButtonClicked}
                                />
                                <Button variant="contained" color="secondary" component="span" sx={{ mr: 1 }}>
                                    Add Photo
                                </Button>
                            </label>
                            <Button variant="contained" color="inherit" onClick={this.handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Typography variant="h6" component="div" color="inherit">
                            Please Login
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
        ) : (
            <div/>
        );
    }
}

export default TopBar;
