import { useDoc } from '@docusaurus/theme-common/internal';
import React, { useState, useEffect } from 'react';
import semver from 'semver';

export default function VersionInfo() {
  const { frontMatter } = useDoc();

  const versionGte = frontMatter.sidebar_custom_props?.versionGte as string | number | undefined;
  const versionLte = frontMatter.sidebar_custom_props?.versionLte as string | number | undefined;

  const [upToDate, setUpToDate] = useState(true);
  const [versionLatest, setVersionLatest] = useState('');

  function isUpToDate(currentVersion, latestVersion) {
    const currentSemver = semver.parse(currentVersion);
    const latestSemver = semver.parse(latestVersion);

    if (!currentSemver || !latestSemver) {
      throw new Error('Invalid version format');
    }

    return currentSemver.major === latestSemver.major && currentSemver.minor === latestSemver.minor;
  }

  fetch('https://api.github.com/repos/betaflight/betaflight/releases/latest', {
    headers: {
      Authorization: 'Bearer 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',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      setVersionLatest(json.tag_name);
      if (versionLte) {
        setUpToDate(isUpToDate(versionLte, json.tag_name));
      }
    });

  return (
    <div className={`${versionGte || versionLte ? 'pt-4 pb-8' : ''} gap-2 flex flex-col`}>
      {versionGte && (
        <div className="flex items-center">
          <div className="w-1 rounded-full bg-lime-500 mr-2 h-6"></div>
          <div className="mr-2 font-bold">Applies to versions after:</div>
          <div className="bg-lime-500/20 font-bold dark:text-lime-500 text-lime-600 flex w-fit flex-row p-1 border-2 border-current rounded-full text-sm items-center min-w-[3rem] justify-center">
            <div>{versionGte}</div>
          </div>
        </div>
      )}
      {versionLte && (
        <div className="flex items-center">
          <div className="w-1 rounded-full bg-lime-500 mr-2 h-6"></div>
          <div className="mr-2 font-bold">Applies to versions before:</div>
          <div className="bg-lime-500/20 font-bold dark:text-lime-500 text-lime-600 flex w-fit flex-row p-1 border-2 border-current rounded-full text-sm items-center min-w-[3rem] justify-center">
            <div>{versionLte}</div>
          </div>
        </div>
      )}
      {!upToDate && (
        <div className="flex w-full">
          <div className="w-1 rounded-full bg-[--ifm-color-danger-dark] mr-2 flex"></div>
          <div className="bg-[--ifm-color-danger-contrast-background] p-4 rounded-2xl flex flex-col w-fit">
            <div className="flex mb-2 items-center">
              <svg viewBox="0 0 16 16" className="w-6 h-6 fill-[--ifm-color-danger-dark] mr-2">
                <path
                  fillRule="evenodd"
                  d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
                />
              </svg>
              <p>
                This page applies to versions before <span className="text-[--ifm-color-danger-dark] font-bold">{`${versionLte}`}</span>, the latest release is{' '}
                <a
                  className="text-[--ifm-color-danger-dark] font-bold"
                  href={`https://github.com/betaflight/betaflight/releases/tag/${versionLatest}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`${versionLatest}`}</a>
              </p>
            </div>
            <p>The information on this page may be outdated, please refer to the latest release notes to check for any changes. Proceed with caution.</p>
          </div>
        </div>
      )}
    </div>
  );
}
