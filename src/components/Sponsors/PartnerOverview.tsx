import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function PartnerOverview(): React.JSX.Element {
  const [data, setData] = useState<string | null>(null);
  const { colorMode } = useColorMode();

  async function fetchData(mode: string): Promise<void> {
    const response = await fetch(`https://build.betaflight.com/api/app/sponsors/${mode}/all`);
    setData(await response.text());
  }

  useEffect(() => {
    fetchData(colorMode);
  }, [colorMode]);

  if (!data) {
    return (
      <div className="min-h-[60px] text-2xl flex justify-center items-center">
        <FontAwesomeIcon className="mr-2" icon={faSpinner} spin />
        Loading...
      </div>
    );
  }

  return <div id="partner_overview" className="min-h-[54px]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }} />;
}
