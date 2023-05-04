import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = {
  children: React.ReactNode
}

export default function BetaflightLayout({ children }: Props) {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.title} - Pushing the Limits of UAV Performance`} description="Are you ready to fly?">
      <div
        className="absolute w-full pointer-events-none -z-20 brightness-50"
        style={{
          WebkitMaskImage: 'linear-gradient(transparent, black, transparent)',
        }}
      >
        <img src="img/betaflight/background.svg" alt="Background" />
      </div>
      <div className="absolute w-full -z-10 md:top-0 top-16">
        <svg className="max-w-full h-fit" width="2700" height="1200" viewBox="0 0 2700 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_2)">
            <g filter="url(#filter0_d_1_2)">
              <path
                d="M2700 2.38745C2448.27 2.38745 2371.37 353.391 2082.39 353.391C1742.09 353.391 1800.03 836.488 1409.59 792.37C1240.29 773.24 1022.42 1021.73 846.885 1021.73C686.747 1021.73 657.834 926.332 466.9 926.332C275.965 926.332 15.5274 1111.58 0 1200L2700 1200V2.38745Z"
                className="fill-[var(--ifm-background-color)]"
              />
            </g>
          </g>
          <defs>
            <filter id="filter0_d_1_2" x="-270" y="-267.613" width="3100" height="1597.61" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-70" dy="-70" />
              <feGaussianBlur stdDeviation="100" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape" />
            </filter>
            <clipPath id="clip0_1_2">
              <rect width="2700" height="1200" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="xl:max-w-[1920px] xl:m-auto flex flex-col items-center min-h-screen mt-16 w-full">{children}</div>
    </Layout>
  );
}
