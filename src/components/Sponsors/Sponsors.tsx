import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { sanitize } from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cycleInterval = 10000; // 10 seconds

export default function Sponsors(): React.JSX.Element {
  const [data, setData] = useState(null);

  const [counter, setCounter] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, cycleInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevCounter) => prevCounter + 1);
    }, cycleInterval / 5);

    return () => clearInterval(interval);
  }, []);

  const { colorMode } = useColorMode();

  async function fetchData(mode: string, page: string): Promise<void> {
    const response = await fetch(`https://build.betaflight.com/api/configurator/sponsors/${mode}/${page}`);
    setData(await response.text());
  }

  useEffect(() => {
    fetchData(colorMode, 'landing');
  }, [colorMode, counter]);

  return (
    <div>
      {data ? (
        <div dangerouslySetInnerHTML={{ __html: sanitize(data) }} />
      ) : (
        <div className="text-2xl min-h-[180px] flex justify-center items-center">
          <FontAwesomeIcon className="mr-2" icon={faSpinner} spin />
          Loading...
        </div>
      )}
      <div class="justify-center flex gap-4 mt-4">
        {[...Array((seconds % 5) + 1)].map((_, i) => (
          <div key={i} class="transition-all w-4 h-4 rounded-full bg-gray-500/20 border border-transparent" />
        ))}
        {[...Array(5 - (seconds % 5) - 1)].map((_, i) => (
          <div key={i} class="w-4 h-4 rounded-full border bg-transparent border-gray-500/20" />
        ))}
      </div>
    </div>
  );
}
