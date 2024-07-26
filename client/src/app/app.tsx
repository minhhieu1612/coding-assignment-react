import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './app.module.css';
import routes from './routes';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <Layout className='min-h-screen'>
      <Header className='text-white h-auto'>
        <h1 className='text-3xl my-4'>Ticketing App</h1>
      </Header>
      <Content className='px-12 py-5'>
        <RouterProvider router={router} />
      </Content>
    </Layout>
  );
};

export default App;
