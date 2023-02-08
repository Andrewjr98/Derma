import React from "react";

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_POST } from "../utils/queries";

const Post = () => {
    const { postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { postId: postId },
    });

    const Post = data?.Post || {};

    if (loading) {
        return <div> loading content...</div>;
    }
    return (
        <div className="">
            <h2 className="">
                {Post.postAuthor} <br />
                <span style={{ fontSize: '15px' }}>
                    Posted this on {Post.createdAt}
                </span>
            </h2>
            <div className="">
                <blockquote
                    className=""
                    style={{}}
                >
                    {Post.message}
                </blockquote>
            </div>
            <div className="">
                <CommentList comments= {Post.comments}/>
            </div>
            <div className="" style={{}}>
                <CommentForm postId={Post._id}/>
            </div>
        </div>
    );
};

export default Post;