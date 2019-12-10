import { gql } from "apollo-boost";

export const login = gql`
  mutation Verify($id: String!) {
    verify(signedMessage: $id) {
      address
    }
  }
`;
export const signup = gql`
  mutation Create($id: String!) {
    createNewAccount(privateKey: $id) {
      newKey
    }
  }
`;
export const hasLoggedIn = gql`
  {
    isLoggedIn @client
  }
`;
