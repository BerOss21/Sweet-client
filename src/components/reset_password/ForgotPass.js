import React,{Component,Fragment} from "react";
import axios from 'axios';
import { message,Spin } from "antd";
import Footer from "../Footer";


class ForgotPass extends Component{
    constructor(props){
        super(props);  
        this.sendEmail=this. sendEmail.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.state={
            email:"",
            error:"",
            spinning:false
        };
    };
    changeEmail(e){
        e.preventDefault();
        this.setState({
            email:e.target.value
        })     
    }
    sendEmail(e){
        e.preventDefault();
        this.setState({spinning:true});
        axios.post("/api/password/email",{
            email:this.state.email,
        }).then(res=>{
            this.setState({
                email:"",
            });
            message.success("Check your mail box to change your password");
            this.props.history.push("/admin");
        }).catch(error=>{
            if (error.response){
                console.log(error.response)
                this.setState({
                    error:error.response.data.error
                })
            }
        }) 
    }
    
    render(){
        setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
        let error=this.state.error;
        return(
            <Fragment>
                <div style={{width:"30%",margin:"10% auto"}}>
                    <div className="container bg-transparent">
                        <h2 className="mb-5 text-center">Forgot Password (ADMIN) </h2>
                        <form className="form-signin" onSubmit={this.sendEmail}>
                            <div className="form-group">
                                <input type="email" id="inputEmail" className="form-control" placeholder="Enter your email " name="email" required onChange={this.changeEmail}/>
                                {
                                    error && <li className="text-danger">{error}</li>
                                }
                            </div>
                            <Spin tip="Loading..." spinning={this.state.spinning}>
                                <button className="btn btn-lg btn-block text-white" type="submit" style={{backgroundColor:"rgb(103,82,50)"}}>Submit</button>
                            </Spin>
                        </form>
                    </div>
                </div>
                <Footer/>
        </Fragment>
        )
    }
}

export default ForgotPass;