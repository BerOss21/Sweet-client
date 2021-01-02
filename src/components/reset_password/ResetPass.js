import React,{Component,Fragment} from "react";
import { message } from "antd";
import axios from 'axios';



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
                password_c:""
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
                <div style={{width:"40%",margin:"10% auto"}}>
                    <div className="container">
                        <h2 className="mb-5 text-center">New Password</h2>
                        <form className="form-signin" onSubmit={this.reset}>
                            <div className="form-group">
                                <input type="email" id="inputEmail" className="form-control" placeholder="Addresse email" name="email" required onChange={this.changeEmail}/>
                                {
                                    error && <li className="text-danger">{error}</li>
                                }
                            </div>
                            <div className="form-group">
                                <input type="password" id="inputPassword" className="form-control" placeholder="Nouveau mot de passe" name="password" required onChange={this.changePass}/>
                                {
                                    errors && <li className="text-danger">{errors.password[1]}</li>
                                }
                            </div>
                            <div className="form-group">
                                <input type="password" id="inputPassword" className="form-control" placeholder="Confirmez le mot de passe " name="password_c" required onChange={this.changePassC}/>
                                {
                                    errors && <li className="text-danger">{errors.password[0]}</li>
                                }
                            </div>
                            <button className="btn btn-lg btn-danger btn-block" type="submit">Valider</button>
                        </form>
                    </div>
                </div>
        </Fragment>
        )
    }
}

export default ResetPass;