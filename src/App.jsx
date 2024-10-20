import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Posts from './components/post'; 
import CreatePost from './components/createPost';
import { Button, Layout, Typography, Space, Card } from 'antd';
import { GoogleOutlined, GithubOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setUsername(session.user.user_metadata?.name || 'User');
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setUsername(session.user.user_metadata?.name || 'User');
        } else {
          setUser(null);
          setUsername('');
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signInWithProvider = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsername('');
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#001529', padding: '0 20px', position: "fixed", width: "100%", zIndex: "100"}}>
          <Title level={3} style={{ color: '#fff', margin: 0 , marginTop: "13px"}}>
            My Social Media App
          </Title>
        </Header>
        <Layout style={{ height: 'calc(100vh - 64px)' }}> 
          <Sider width={200} style={{ background: '#fff', position: 'fixed', height: '100%', left: 0, marginTop: "65px"}}>
            <div style={{ padding: '20px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Link to="/create-post">
                  <Button type="default">Create Post</Button>
                </Link>
                <Link to="/posts">
                  <Button type="default">View Posts</Button>
                </Link>
              </Space>
            </div>
            {user ? (
              <div style={{ padding: '10px', marginTop: "300px" }}>
                <Title level={4}>{username}</Title>
                <Button
                  type="primary"
                  icon={<LogoutOutlined />}
                  onClick={signOut}
                  style={{ marginBottom: 20 }}
                >
                  Sign out
                </Button>
              </div>
            ) : null}
          </Sider>
          <Layout style={{ marginLeft: 200 }}> 
            <Content style={{ padding: 24, margin: 0, minHeight: 280, textAlign: 'center', overflowY: 'auto' }}>
              <Card style={{ maxWidth: 600, margin: '0 auto', borderRadius: 10 }}>
                {user ? (
                  <Routes>
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/" element={<Posts />} /> 
                  </Routes>
                ) : (
                  <div>
                    <Title level={4}>Sign In</Title>
                    <Space direction="vertical">
                    <Button
                        type="primary"
                        icon={<GithubOutlined />}
                        onClick={() => signInWithProvider('github')}
                        style={{ width: '100%' }}
                      >
                        Sign in with GitHub
                      </Button>
                      <Button
                        type="default"
                        icon={<GoogleOutlined />}
                        onClick={() => signInWithProvider('google')}
                        style={{ width: '100%' }}
                      >
                        Sign in with Google
                      </Button>
                     
                    </Space>
                  </div>
                )}
              </Card>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          <Text>My Social Media App ©2024</Text>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
