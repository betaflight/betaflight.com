import React from 'react';
import Logo from '../../../icons/logo.svg';

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer className="p-16 w-full bg-neutral-500/5 shadow-[0_20px_30px_0] shadow-black">
      <div className="text-center">{links}</div>
      {copyright && (
        <div className="text-center">
          <Logo className="w-36 h-36 mr-12 mt-4 inline-block opacity-10"></Logo>
          {copyright}
          <div className="mt-1 text-sm text-neutral-500/60">Built with Docusaurus</div>
          <a className="mt-1 text-sm text-neutral-500/60 font-bold hover:text-teal-500 no-underline duration-300" href="https://www.netlify.com">
            This site is powered by Netlify
          </a>
          <div className="mt-1 text-sm text-neutral-500/60">
            made with <span className="text-red-500">❤️</span> by{' '}
            <a className="font-bold hover:text-emerald-500 no-underline duration-300" href="https://github.com/vitroidfpv">
              VitroidFPV
            </a>{' '}
            and{' '}
            <a className="font-bold hover:text-sky-400 no-underline duration-300" href="https://github.com/freasy">
              un!t
            </a>
          </div>
        </div>
      )}
    </footer>
  );
}
