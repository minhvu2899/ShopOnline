import React from "react";
import PostItem from "./post-item";
interface PostListProps {
  posts: {
    id: number;
    title: string;
    userId: number;
    body: string;
  }[];
}
const PostList = ({ posts }: PostListProps) => {
  if (!posts || posts.length === 0) return <div>Not found post</div>;
  return (
    <div>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
