import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = {
  children: React.ReactNode
}

export default function BetaflightLayout({ children }: Props) {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.tagline}`} description="Are you ready to fly?">
      <div
        className="absolute w-full pointer-events-none -z-20 dark:brightness-50 dark:opacity-100 opacity-60"
        style={{
          WebkitMaskImage: 'linear-gradient(transparent, black, transparent)',
        }}
      >
        <img src="img/betaflight/background.svg" alt="Background" />
      </div>
      <div className="absolute w-full -z-10 md:top-0">
        <svg className="max-w-full h-fit" width="100%" height="1200" viewBox="0 0 2700 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g mask="url(#mask0_1_8)">
            <g filter="url(#filter0_d_1_8)">
              {/* <path
                d="M1962.71 -755.686C1793.33 -569.46 2001.26 -276.4 1806.82 -62.6166C1577.85 189.133 1923.87 455.797 1665.48 722.861C1537.42 835.235 1517.44 863.833 1369.92 871.516C1102.81 885.429 1272.17 1376.75 1143.71 1518C1015.24 1659.25 977.047 1976.56 1032.01 2047.54L2848.68 50.117L1962.71 -755.686Z"
                className="fill-[var(--ifm-color-primary)]"
              /> */}
              <path
                d="M2700 2.38751C2448.27 2.38751 2371.37 353.391 2082.39 353.391C1742.09 353.391 1800.03 836.488 1409.59 792.37C1240.29 773.24 1022.42 1021.73 846.885 1021.73C686.747 1021.73 657.834 926.332 466.9 926.332C275.965 926.332 15.5274 1111.58 0 1200H2700V2.38751Z"
                className="fill-[var(--ifm-background-color)]"
              />
            </g>
          </g>
          <defs>
            <filter id="filter0_d_1_8" x="-270" y="-1025.69" width="3248.68" height="3203.23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-70" dy="-70" />
              <feGaussianBlur stdDeviation="100" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="xl:max-w-[1920px] xl:m-auto flex flex-col items-center min-h-screen mt-16 w-full">{children}</div>
    </Layout>
  );
}
