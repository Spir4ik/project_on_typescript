import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloProvider, ApolloClient,
    InMemoryCache, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {BrowserRouter} from "react-router-dom";


export const createIsomorphLink = createHttpLink({
    uri: "http://localhost:4000/api",
    credentials: 'same-origin',
});

export const authLink: any = setContext((_:any, { headers }:any) => {
    async function getValue() {
        let token: string = await localStorage.getItem('token');
        return{
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    }

    return getValue()
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(createIsomorphLink)
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>
    , document.getElementById('root'));