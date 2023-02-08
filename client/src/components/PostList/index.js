import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({
    posts,
    title,
    showTitle = true,
    showUsername = true,

}) => {
    if (!posts.length) {
        return <h3>Such Empty</h3>;
    }

    return (
        <div>
            {showTitle && <h3>{title}</h3>}
            {posts &&
                posts.map((Post) => (
                    <div key={Post._id} className="">
                        <h4 className=''>
                            {showUsername ? (
                                <Link
                                    className=''
                                    to={`/profiles/${Post.username}`}
                                >{Post.username}<br />
                                    <span style={{ fontSize: '15px' }}>
                                        Posted this on {Post.createdAt}
                                    </span>
                                </Link>
                            ) : (
                                <>
                                    <span style={{ fontSize: '15px' }}>
                                        You Posted this on {Post.createdAt}
                                    </span>
                                </>
                            )}
                        </h4>
                        <div className=''>
                            <p>{Post.message}</p>
                        </div>
                        <Link
                            className='' to={`/posts/${Post._id}`}
                        >
                            Give your 2 cents on this Post.
                        </Link>
                    </div>
                ))}
            </div>
            );
};

export default PostList;