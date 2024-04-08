import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { sanitize } from 'dompurify';

export default function Sponsors(): React.JSX.Element {
  const [data, setData] = useState(null);
  const { colorMode } = useColorMode();

  async function fetchData(mode: string, page: string): Promise<void> {
    const response = await fetch(`https://build.betaflight.com/api/configurator/sponsors/${mode}/${page}`);
    setData(await response.text());
  }

  useEffect(() => {
    fetchData(colorMode, 'landing');
  }, [colorMode]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: sanitize(data) }} />;
}
