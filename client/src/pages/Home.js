import { useQuery } from "@apollo/client";
import PostList from "../components/CommentList";
import PostForm from "../components/PostForm";
import { QUERY_POSTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.Posts || [];

  return (
    <main className="">
      <div className="flex flex-col items-center">
        <header className="text-3xl font-medium text-center mb-10">
          Welcome to Derma 
        </header>
        <PostForm/>
        <div className="w-full max-w-4xl">
          {loading ? (
            <div className="">Loading...</div>
          ) : (
            <PostList posts={posts} 
            title="Some Feed fot Post(s)"/>
          )}
        </div>
      </div>
    </main>
  );
};


export default Home;
