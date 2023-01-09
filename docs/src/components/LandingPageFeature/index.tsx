import React from 'react';
import clsx from 'clsx';
import slugify from 'react-slugify';

type Props = {
    title: string;
    className?: string;
    children: React.ReactNode;
    addToList?: (slug: string, title: string) => void;
}

export default function LandingPageFeature({ title, children, addToList, className }: Props) {
    const slug = slugify(title);
    if (addToList) {
        addToList(slug, title);
    }
    return (
        <div id={slugify(title)} className={clsx('p-4 rounded-2xl', className)}>
            <h1 className="mb-4 text-4xl font-bold uppercase text-center">{ title }</h1>
            {children}
        </div>
    );
}