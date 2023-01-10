import React from 'react';
import clsx from 'clsx';
export default function FooterLayout({style, links, logo, copyright}) {
  return (
    <footer
      className="p-16 w-full from-neutral-500/10 via-neutral-500/10 to-primary-500/5 bg-gradient-to-b shadow-[0_20px_30px_0] shadow-black">
      <div className="">
        {links}
        {(logo || copyright) && (
          <div className="text-center">
            {logo && <div className="">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
