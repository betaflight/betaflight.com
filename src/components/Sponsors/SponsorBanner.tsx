import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cycleIntervalMs = 30000; // 10 seconds

export default function SponsorBanner(): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<string | null>(null);
  const [counter, setCounter] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const { colorMode } = useColorMode();

  const countUp = (stateFunc: React.Dispatch<React.SetStateAction<number>>, intervalMs: number): (() => void) => {
    const interval = setInterval(() => {
      stateFunc((x) => x + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    return countUp(setCounter, cycleIntervalMs);
  }, []);

  useEffect(() => {
    return countUp(setSeconds, cycleIntervalMs / 5);
  }, []);

  async function fetchData(mode: string, page: string): Promise<void> {
    const response = await fetch(`https://build.betaflight.com/api/configurator/sponsors/${mode}/${page}`);
    setLoading(true);
    setTimeout(async () => {
      setData(await response.text());
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    fetchData(colorMode, 'landing');
  }, [colorMode, counter]);

  return (
    <div>
      {data ? (
        <div className={`transition-opacity duration-1000 min-h-[99px] ${loading ? 'opacity-0' : 'opacity-100'}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }} />
      ) : (
        <div className="min-h-[99px] text-2xl flex justify-center items-center">
          <FontAwesomeIcon className="mr-2" icon={faSpinner} spin />
          Loading...
        </div>
      )}
      <div className="justify-center flex gap-4 mt-4">
        {[...Array((seconds % 5) + 1)].map((_, i) => (
          <div key={i} className="transition-all w-4 h-4 rounded-full bg-gray-500/20 border border-transparent" />
        ))}
        {[...Array(5 - (seconds % 5) - 1)].map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full border bg-transparent border-gray-500/20" />
        ))}
      </div>
    </div>
  );
}
