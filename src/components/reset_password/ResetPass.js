import React,{Component,Fragment} from "react";
import { message,Spin } from "antd";
import axios from 'axios';
import Footer from "../Footer";



class ResetPass extends Component{
    constructor(props){
        super(props);  
        this.reset=this.reset.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.changePass=this.changePass.bind(this);
        this.changePassC=this.changePassC.bind(this);
        this.state={
            email:"",
            password:"",
            password_c:"",
            error:"",
            errors:"",
            spinning:false
        }
    };

    changeEmail(e){
        e.preventDefault();
        this.setState({
            email:e.target.value
        })     
    }
    changePass(e){
        e.preventDefault();
        this.setState({
            password:e.target.value
        })
    }
    changePassC(e){
        e.preventDefault();
        this.setState({
            password_c:e.target.value
        })
    }
    reset(e){
        e.preventDefault();
        this.setState({spinning:true})
        axios.post("/api/password/reset",{
            email:this.state.email,
            token:this.props.match.params.token,
            password:this.state.password,
            password_confirmation:this.state.password_c
        }).then(res=>{
            console.log(res);
            message.success("Password changed");
            this.props.history.push("/admin");
            this.setState({
                email:"",
                password:"",
                password_c:"",
            }) 
        }).catch(error=>{
            if (error.response){
                console.log(error.response)
                if(error.response.data.errors){
                    this.setState({
                        errors:error.response.data.errors,
                        error:""
                    })
                }
                else if(error.response.data.error){
                    this.setState({
                        error:error.response.data.error,
                        errors:""
                    })
                }
               
            }
        })     
    }

    render(){
        setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
        let error=this.state.error;
        let errors=this.state.errors;
        return(
            <Fragment>
                <div style={{width:"30%",margin:"10% auto"}}>
                    <div className="container bg-transparent">
                        <h2 className="mb-5 text-center">New Password</h2>
                        <form className="form-signin" onSubmit={this.reset}>
                            <div className="form-group">
                                <input type="email" id="inputEmail" className="form-control" placeholder="Email" name="email" required onChange={this.changeEmail}/>
                                {
                                    error && <li className="text-danger">{error}</li>
                                }
                            </div>
                            <div className="form-group">
                                <input type="password" id="inputPassword" className="form-control" placeholder="New password" name="password" required onChange={this.changePass}/>
                                {
                                    errors && <li className="text-danger">{errors.password[1]}</li>
                                }
                            </div>
                            <div className="form-group">
                                <input type="password" id="inputPassword" className="form-control" placeholder="Confirm new password " name="password_c" required onChange={this.changePassC}/>
                                {
                                    errors && <li className="text-danger">{errors.password[0]}</li>
                                }
                            </div>
                            <Spin tip="Loading..." spinning={this.state.spinning}>
                                <button className="btn btn-lg btn-block text-white" type="submit" style={{backgroundColor:"rgb(103,82,50)"}}>Submit</button>
                            </Spin>
                        </form>
                    </div>
                    <Footer/>
                </div>
        </Fragment>
        )
    }
}

export default ResetPass;