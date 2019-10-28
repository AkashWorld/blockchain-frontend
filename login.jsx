import React from "react";

class login extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:""
        };
        this.handleChange=this.handleChange.bind(this);
        //this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setChange({[event.target.name]:event.target.value})
    }
    
    render(){
        //onSubmit={this.handleSubmit}
        const {username,password}=this.state
        return (
            <form> 
                <label>username: <input type="name" value = {username} onChange={this.handleChange}/></label>
                <label> password: <input type="password" value = {password} onChange={this.handleChange}/></label>
                <button type="button">login</button>
            </form>
        );
    }
}

export default login;