import React from 'react';
import {Navbar,Button,Spinner,Card,Container,Row,Col,NavDropdown,Nav,Form, FormLabel,Table, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../login.css';
import avatar from '../avatar.png';
import anits from '../anits.jpg';
import host from '../Host'

class Login extends React.Component {
    state = {
        username:"",
        password:"",
        status:"",
        loading: false
    }

    submitFn = (e) => {
        e.preventDefault();
        this.setState({loading:true});
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        axios.post(host+"api/login/", data)
        .then(res => { // then print response status
            if(res.data.error==false){
                this.setState({loading:false,resp:res.data,status:""});
                this.props.logFn(true,res.data)
            }
            else {
                this.setState({loading:false,status:res.data.msg});
            }
        })
    }
    render() {
        var chngval = (e) => {
            this.setState({[e.target.id]:e.target.value})
        }
        return(
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 ads">
                        <img src={anits} alt="profile_img" height="140px" width="140px;"/>
                    </div>
                    <div className="col-md-6 login-form">
                        <div className="profile-img">
                        <img src={avatar} alt="profile_img" height="140px" width="140px;"/>
                        </div>
                        <h3>Login</h3>
                        <form onSubmit={this.submitFn}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="username" placeholder="Username" onChange={chngval} required/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={chngval} required/>
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={this.state.loading} className="btn btn-primary btn-lg btn-block">
                                {
                                    this.state.loading?<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />:null
                                }
                                Sign In
                            </button>
                        </div>
                        {
                            !!this.state.status&&!this.state.loading?
                                <Alert variant={"danger"}>
                                    {this.state.status}
                                </Alert>:null
                        }                        
                        {/* <div className="form-group forget-password">
                            <a href="#">Forget Password</a>
                        </div> */}
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}

export default Login;