import React, { useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { sanitize } from 'dompurify';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Sponsors(): React.JSX.Element {
  const { colorMode } = useColorMode();
  let data: string | null = localStorage.getItem(colorMode);

  async function fetchData(mode: string, page: string): Promise<void> {
    if (!data) {
      const response = await fetch(`https://build.betaflight.com/api/configurator/sponsors/${mode}/${page}`);
      data = await response.text();
      localStorage.setItem(mode, data);
    }
  }

  useEffect(() => {
    fetchData(colorMode, 'landing');
  });

  return (
    <BrowserOnly>
      {() => {
        if (!data) {
          return <div>Loading...</div>;
        }

        return <div dangerouslySetInnerHTML={{ __html: sanitize(data) }} />;
      }}
    </BrowserOnly>
  );
}
