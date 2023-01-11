import React from 'react';
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
            <div className='text-sm text-neutral-500/60'>Built with Docusaurus</div>
            <div className='mt-1 text-sm text-neutral-500/60'>made with <span className="text-red-500">❤️</span> by <a className='font-bold' href="https://github.com/vitroidfpv">VitroidFPV</a> and <a className='font-bold' href="https://github.com/freasy">un!t</a></div>
          </div>
        )}
      </div>
    </footer>
  );
}
