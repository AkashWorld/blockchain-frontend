import React from "react";
import ApolloClient from 'apollo-boost';
import { ApolloProvider,compose,Mutation} from 'react-apollo';
import Display_Data  from './test-components/display';
import Input_Field from './test-components/inputField';

const PORT = 8080;
const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    onError: ({ graphQlErrors, networkError }) => {
        if (networkError) {
            console.log("Network error");
        }
    }
});

export class Demo extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Display_Data />
                <Input_Field />
            </ApolloProvider>
        );
    }
}
