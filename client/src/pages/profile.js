import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/PostForm';
import ThoughtList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


