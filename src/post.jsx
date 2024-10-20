import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './post.css'

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) console.error(error);
    else setPosts(data);
  };

  const handlePost = async () => {
    const { data, error } = await supabase.from('posts').insert([newPost]);
    if (error) console.error(error);
    else fetchPosts();
  };

  const handleLike = async (id, likes) => {
    const { data, error } = await supabase
      .from('posts')
      .update({ like_count: likes + 1 })
      .eq('id', id);
    if (error) console.error(error);
    else fetchPosts();
  };

  const handleRepost = async (id, reposts) => {
    const { data, error } = await supabase
      .from('posts')
      .update({ repost_count: reposts + 1 })
      .eq('id', id);
    if (error) console.error(error);
    else fetchPosts();
  };

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            {post.image && <img src={post.image} alt={post.title} className="post-image" />}
            <div className="post-actions">
              
              
              <button onClick={() => handleLike(post.id, post.like_count)} className="post-button">
              <p className="post-likes">Likes: {post.like_count}</p>
              </button>
              <button onClick={() => handleRepost(post.id, post.repost_count)} className="post-button">
              <p className="post-reposts">Reposts: {post.repost_count}</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
