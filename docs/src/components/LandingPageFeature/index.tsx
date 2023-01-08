import React from 'react';
import clsx from 'clsx';

type Props = {
    title: string;
    className?: string;
}

export default function LandingPageFeature({ title, children, className }: Props) {
    return (
        <div className={clsx('p-4 rounded-2xl', className)}>
            <h1 className="mb-4 text-4xl font-bold uppercase text-center">{ title }</h1>
            {children}
        </div>
    );
}