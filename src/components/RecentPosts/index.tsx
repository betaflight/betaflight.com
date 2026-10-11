import React from 'react';
import Link from '@docusaurus/Link';
import { BlogProps } from '@site/src/types';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function RecentPosts({ recentPosts }: BlogProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6 w-full">
        {recentPosts.map(({ content: { metadata } }) => (
          <Link
            key={metadata.permalink}
            to={metadata.permalink}
            className="flex flex-col rounded-2xl p-4 xl:p-6 bg-neutral-500/10 hover:bg-neutral-500/20 transition-colors duration-300 text-inherit hover:text-inherit hover:no-underline"
          >
            <span className="text-sm opacity-70">{formatDate(metadata.date)}</span>
            <span className="text-primary-600 font-bold text-lg xl:text-xl mt-1">{metadata.title}</span>
            <span className="mt-2 line-clamp-3">{metadata.description}</span>
          </Link>
        ))}
      </div>
      <Link to="/blog" className="self-end mt-4 fancy-link no-underline">
        All posts →
      </Link>
    </div>
  );
}
