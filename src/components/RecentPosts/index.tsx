import React from 'react';
import { BlogProps } from '@site/src/types';
import { NewspaperIcon } from '@heroicons/react/24/solid';

export default function RecentPosts({ recentPosts }: BlogProps ) {

    function clampAndFormatMinutes(minutes: number) {
        if (minutes < 1) {
            return 'One minute read';
        }
        return `${minutes  } minutes read`;
    }

    function formatDate(date: string) {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        });
    }

    return (
        <div className='flex flex-col mb-4'>
            <div className='text-primary-500 font-bold text-3xl uppercase mb-4 mt-8'>
                <NewspaperIcon className='h-8 w-8 inline-block mr-4'></NewspaperIcon>
                Recent Posts
            </div>
            <div className="flex-grow flex flex-col space-y-4 text-white/80">
                {
                    recentPosts.map(({ content: BlogPostContent }) => (
                        <div key={BlogPostContent.metadata.source}>
                            <a className='text-primary-600 text-2xl font-bold' href={BlogPostContent.metadata.permalink}>{BlogPostContent.metadata.title}</a>
                            <div className='text-sm text-gray-600'>{ formatDate(BlogPostContent.metadata.date) } - { clampAndFormatMinutes(BlogPostContent.metadata.readingTime) }</div>
                            <div className='text-lg text-gray-700'>{BlogPostContent.metadata.description}</div>
                        </div>
                    ),
                    )
                }
            </div>
        </div>
    );
}