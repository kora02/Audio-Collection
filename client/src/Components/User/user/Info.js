import React from 'react';
import CardItem from './pages/CardItem';

const Info = ({ posts }) => {
  // Check if posts is defined and is an array
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return <div>No posts to display</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <CardItem
          key={post.id} // Assuming post.id exists and is unique
          text={post.name} // Assuming post.name is the text to display
          genre={post.genre}
          wordCount={post.wordCount}
          path={`/user/info/${post.id}`} // Assuming you want to navigate to a specific post
        />
      ))}
    </div>
  );
};

export default Info;
