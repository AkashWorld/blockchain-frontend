import { gql } from 'apollo-boost';

//export const input;

export const login = gql`
    mutation($id:String!){
        login(unsigned_address:$id){
            signed_address
        }
    }
`;

