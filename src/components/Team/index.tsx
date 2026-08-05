import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import teamInfo from '../../json/team.json';

type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  blog: string;
  location: string | null;
};

export default function TeamFeature() {
  const userData: GitHubUser[] = teamInfo;

  function truncateStr(str: string) {
    return str.length > 20 ? `${str.substring(0, 20)}...` : str;
  }

  function checkLink(link: string, short = false) {
    let tmp = link.startsWith('http') ? link : `https://${link}`;
    tmp = short ? tmp.replace('https://', '').replace('www.', '') : tmp;
    return tmp.endsWith('/') ? tmp.slice(0, -1) : tmp;
  }

  return (
    <>
      {(!userData || userData.length === 0) && (
        <div className="text-2xl">
          <FontAwesomeIcon className="mr-2" icon={faSpinner} spin />
          Loading...
        </div>
      )}
      {userData && (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {userData.map((user) => (
            <div key={user.id}>
              <div className="h-full overflow-hidden relative flex flex-col items-center rounded-xl bg-neutral-400/10 hover:bg-neutral-300/10 duration-150 p-4 shadow-none hover:shadow-lg shadow-neutral-900/5">
                <img src={user.avatar_url} alt={user.login} className="rounded-full w-16 h-16" />
                <div className="mt-2 text-primary-600 text-sm font-semibold">{user.login}</div>
                <div className="text-xs text-neutral-600 font-semibold">{user.name}</div>
                {user.location && <div className="text-xs text-neutral-600">{truncateStr(user.location)}</div>}
                {user.blog && (
                  <div className="text-xs text-neutral-600 font-semibold">
                    <a className="fancy-link no-underline" href={checkLink(user.blog)} target="_blank" rel="noreferrer">
                      {truncateStr(checkLink(user.blog, true))}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
