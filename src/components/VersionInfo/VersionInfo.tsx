import { useDoc } from '@docusaurus/theme-common/internal';
import React from 'react';

export default function VersionInfo() {
  const { frontMatter } = useDoc();

  const versionGte = frontMatter.sidebar_custom_props?.versionGte as string | number | undefined;
  const versionLte = frontMatter.sidebar_custom_props?.versionLte as string | number | undefined;

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
    </div>
  );
}
