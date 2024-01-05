import type { NextPage } from 'next';
import React from 'react';
import Layout from '../components/layout';
import Landing from '../components/landing';
import { Box } from '@chakra-ui/react';

const Home: NextPage = () => {
  const [reload, triggerReload] = React.useState(false);

  return (
    <Box>
      <Layout>
        <Landing reload={reload} triggerReload={triggerReload} />
      </Layout>
    </Box>
  )
}

export default Home;