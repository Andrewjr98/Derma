import { useQuery } from "@apollo/client";
import {
  QUERY_POSTS,
  QUERY_ME,
  QUERY_USER,
  QUERY_USERS,
} from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main className="">
      <div className="flex flex-col items-center">
        <header className="text-3xl font-medium text-center mb-10">
          Welcome to Reddit-like Homepage
        </header>
        <div className="w-full max-w-4xl">
          {loading ? (
            <div className="text-center text-gray-700 font-medium my-10">
              Loading...
            </div>
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
  <div className="p-4 bg-white shadow rounded-lg mb-4">
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-700 leading-normal mb-4">{content}</p>
    <div className="mb-4">
      <div className="font-medium text-gray-700 mb-2">Author: {username}</div>
      <div className="text-gray-700 mb-2">Image: {image}</div>
      <div className="text-gray-700 mb-2">Tags: {tags.join(", ")}</div>
    </div>
    <div className="flex justify-between">
      <div className="text-gray-700">Likes: {likeCount}</div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
        Like
      </button>
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
    <div className="mt-4">
      <form className="bg-gray-200 p-4 rounded-lg">
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">
            Add Comment:
          </label>
          <textarea className="border p-2 w-full" rows="3"></textarea>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
          Submit
        </button>
      </form>
    </div>
  </div>
);
const Comment = ({ author, createdAt, text }) => (
  <div className="p-2 bg-gray-200 rounded-lg mb-2">
    <div className="font-medium text-gray-700 mb-2">
      {author} on {createdAt}
    </div>
    <div className="text-gray-700">{text}</div>
  </div>
);
export default Home;
