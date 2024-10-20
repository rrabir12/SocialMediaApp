// src/CreatePost.js
import React, { useState } from 'react';
import { supabase } from './src/supabaseClient';
import { Button, Input, message } from 'antd';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content }]);
    
    if (error) {
      message.error('Error creating post');
      console.error(error);
    } else {
      message.success('Post created successfully');
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Input.TextArea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        style={{ marginBottom: 20 }}
      />
      <Button type="primary" onClick={handleSubmit}>
        Submit Post
      </Button>
    </div>
  );
};

export default CreatePost;
