import { gql } from 'apollo-boost';

//export const input;

export const login = gql`
    mutation($id:String!){
        verify(signed_address:$id){
            address
        }
    }
`;
export const signup = gql`
    mutation($id:String!){
        createNewAccount(privateKey:$id){
            newKey
        }
    }
`;
export const hasLoggedIn = gql`
    {
        isLoggedIn @client      
    }
`;
