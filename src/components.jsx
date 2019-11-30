// JavaScript source code
import React from "react";
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
const mockquery = gql`
    query{
        getAll{
            name
            id
        }
    }
`;
/*const mockmutation = gql`
    mutation {
        updateParameter
    }
`;
export class Form extends React.Component {
    render() {
        return (
            <form method="this.submitForm">
                <div>
                    <label>Name:</label>
                    <input type="text" id="name" name="user_name"></input>
                </div>
                <div>
                    <label >Age:</label>
                    <input type="email" id="mail" name="user_mail"></input>
                </div>
                <div className="button">
                    <button type="submit">Send your message</button>
                </div>
            </form>
        );
    }
    submitForm() {

    }
}*/
class Display_Data extends React.Component {
    display() {  
        var data = this.props.data;
        console.log(data);
        if (data.loading == true) {
            return <p>loading</p>
        }
        else {
            return data.getAll.map(user => {
                return <p key={user.id}>{user.name + " " + user.id}</p>;
            })
        }
    }
    render() {
        return <div>
            <p>Name id</p>
            {this.display()}
        </div>;
    }
}
export default graphql(mockquery) (Display_Data);