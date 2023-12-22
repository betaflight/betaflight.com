//window.location.replace('/docs/wiki/getting-started/');

import React from 'react';
import Layout from '@theme/Layout';

export default function Help() {
  return (
    <Layout title="Help" description="Help redirect">
      <script>function myFunction() {window.location.replace('/docs/wiki/getting-started/')}</script>
      <div>
        <p>immediate redirect</p>
      </div>
    </Layout>
  );
}
