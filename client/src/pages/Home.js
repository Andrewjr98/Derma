import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main className="">
      <div className="">
        <header className="">Welcome to Reddit-like Homepage</header>
        <div className="">
          {loading ? (
            <div className="">Loading...</div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </div>
    </main>
  );
};

const PostList = ({ posts }) => (
  <div>
    {posts.map((post) => (
      <Post
        key={post.id}
        title={post.title}
        content={post.message}
        tags={post.tags}
        image={post.image}
        username={post.username}
        likeCount={post.likeCount}
        comments={post.comments}
      />
    ))}
  </div>
);

const Post = ({
  title,
  content,
  tags,
  image,
  username,
  likeCount,
  comments,
}) => (
  <div className="">
    <h3 className="">{title}</h3>
    <p className="">{content}</p>
    <div className="">
      <div className="">Author: {username}</div>
      <div className="">Image: {image}</div>
      <div className="">Tags: {tags.join(", ")}</div>
    </div>
    <div className="f">
      <div className="">Likes: {likeCount}</div>
      <button className="">Like</button>
    </div>
    <div className="mt-4">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.commentAuthor}
          createdAt={comment.createdAt}
          text={comment.comment}
        />
      ))}
    </div>
    <div className="">
      <form className="">
        <div className="">
          <label className="">Add Comment:</label>
          <textarea className="" rows="3"></textarea>
        </div>
        <button className="">Submit</button>
      </form>
    </div>
  </div>
);
const Comment = ({ author, createdAt, text }) => (
  <div className="">
    <div className="">
      {author} on {createdAt}
    </div>
    <div className="">{text}</div>
  </div>
);

export default Home;
