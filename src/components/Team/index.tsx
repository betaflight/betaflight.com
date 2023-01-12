import React, { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type GitHubUser = {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export default function TeamFeature() {
    const githubUsers = [
        "Asizon",
        "blckmn",
        "borisbstyle",
        "chmelevskij",
        "daleckystepan",
        "DieHertz",
        "ctzsnooze",
        "haslinghuis",
        "JyeSmith",
        "KarateBrot",
        "klutvott123",
        "limonspb",
        "McGiverGim",
        "SteveCEvans",
        "sugaarK",
        "wind0r",
    //tomche
    //'VitroidFPV',
    //'freasy'
    ];

    const [userData, setUserData] = useState<GitHubUser[]>([]);

    useEffect(() => {
        const fetchData = async () =>
            await Promise.all(
                githubUsers.map((user) =>
                    fetch(`https://api.github.com/users/${user}`).then((res) =>
                        res.json(),
                    ),
                ),
            ).then((data) => {
                setUserData(data);
            });

        fetchData();
    }, []);

    function truncateStr(str: string) {
        return str.length > 20 ? `${str.substring(0, 20)}...` : str;
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
                            <div className="h-full overflow-hidden relative flex flex-col items-center rounded-2xl bg-neutral-500/10 p-4">
                                <img
                                    src={user.avatar_url}
                                    alt={user.login}
                                    className="rounded-full w-16 h-16"
                                />
                                <div className="mt-2">{user.login}</div>
                                <div>{user.name}</div>
                                {user.location && <div>{truncateStr(user.location)}</div>}
                                {user.blog && (
                                    <div className="text-blue-400">
                                        <a href={user.blog}>{truncateStr(user.blog)}</a>
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
