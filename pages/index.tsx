import type { NextPage } from 'next';
import React from 'react';
import Layout from '../components/layout';
import Landing from '../components/landing';

const Home: NextPage = () => {
  const [reload, triggerReload] = React.useState(false);

  return (
    <Layout>
      <Landing reload={reload} triggerReload={triggerReload} />
    </Layout>
  )
}

export default Home;