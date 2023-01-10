import React from 'react';
import clsx from 'clsx';

type Props = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  compact?: boolean;
}

export default function HomepageFeature({ title = '<unset>', compact = false, className, children }: Props): JSX.Element {
  return (
    <section className={className}>
      <h2 className="text-primary-500 text-3xl font-bold my-4 ml-1 text-shadow">{title}</h2>
      <div className={clsx({ 'bg-neutral-500/10 p-8': !compact }, "backdrop-blur-md shadow-xl flex justify-center rounded-2xl")}>
        { children }
      </div>
    </section>
  );
}
