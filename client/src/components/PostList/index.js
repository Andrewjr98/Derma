import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({
    posts,
    title,
    showTitle = true,
    showUsername = true,

}) => {
    if(!posts.length) {
        return <h3>Such Empty</h3>;
    }

    return (
        <div>
            {showTitle && <h3>{title}</h3>}
            {posts &&
            posts.map((Post) =>(
                <div key={post._}
            ))}
        </div>
    )
}