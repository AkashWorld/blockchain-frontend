import React from "react";

class createNew extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            pass2:"",
            email:""
        };
        this.handleChange=this.handleChange.bind(this);
        //this.handleSubmit=this.handleSubmit.bind(this);
    }
    render(){
        return (
            <form>
                 <label>Create username: <input type="text" value = {username} onChange={this.handleChange}/></label>
                 
                 <label>Create password: <input type="password" value = {password} onChange={this.handleChange}/></label>
                 
                 <label>Enter email address: <input type="email" value = {email} onChange={this.handleChange}/></label>


            
            </form>
            
        );
        
    }
}