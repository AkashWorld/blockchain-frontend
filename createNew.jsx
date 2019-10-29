import React from "react";

class createNew extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            email:""
        };
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event){
        this.setChange({[event.target.name]:event.target.value})
        
    }
    
    render(){
        return (
            <form>
                 <label>
                    Create username: <input type="text" name ="username"value = {this.state.username} onChange={this.handleChange}/>
                 </label>
                 
                 <label>
                    Create password: <input type="password" name = "password"value = {this.state.password} onChange={this.handleChange}/>
                 </label>
                 
                 <label>
                    Enter email address: <input type="email" namew = "email"value = {this.state.email} onChange={this.handleChange}/>
                 </label>
            </form>
            
        );
        
    }
}

export default createNew;