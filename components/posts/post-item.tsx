import React from "react";
interface PostItemProps {
  post: { id: number; title: string; userId: number; body: string };
}
const PostItem = ({ post }: PostItemProps) => {
  return <div>{post.id}</div>;
};

export default PostItem;
