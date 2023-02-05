import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/login';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';



const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { Headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...Headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className=''>
          <Header />
          <div className=''>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='/me'
              element={<Profile />}
            />
            <Route
              path='/profiles/:username'
              element={<Profile />}
            />
            <Route
              path='/posts/:postId'
              element={<Post/>}
            />
          </Routes>
        </div>
        <Footer/>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
