import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className="hero__title">{siteConfig.tagline}</p>
        <div className="flex justify-center mt-4">
          <p className={clsx('hero__subtitle', 'max-w-[500px]')}>Betaflight is flight controller software (firmware) used to fly multi-rotor craft and fixed wing craft. This fork differs from Baseflight and Cleanflight in that it focuses on flight performance, leading-edge feature additions, and wide target support.</p>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`FlyFast - ${siteConfig.title}`}
      description="Are you ready to fly?">
      <HomepageHeader />
      <main>
        <div>
          <img src={require('@site/static/img/header-bg.jpg').default} />
        </div>
      </main>
    </Layout>
  );
}
