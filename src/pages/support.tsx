import React from 'react';
import BetaflightLayout from '../components/Layout';
import HomepageFeature from '../components/HomepageFeature';

export default function Support() {
  return (
    <BetaflightLayout>
      <div className="m-auto p-6 mt-0 xl:mt-16 w-full max-w-6xl">
        <HomepageFeature blur title="Support">
          <div className="w-full max-w-5xl">
            <div className="space-y-8 text-sm leading-relaxed">
              <section id="delete-account" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Delete your Betaflight account</h2>
                <div className="bg-neutral-500/5 p-4 rounded-lg space-y-4">
                  <p>You can delete the Betaflight account you use with the Betaflight App, and the data stored with it, at any time.</p>
                  <div>
                    <h3 className="text-xl font-bold text-primary-600 mb-3">How to delete your account</h3>
                    <ul className="list-disc ml-8 space-y-1">
                      <li>
                        <strong>In the Betaflight App:</strong> open the account menu, select <strong>Profile</strong>, then <strong>Delete account</strong>, and confirm.
                      </li>
                      <li>
                        <strong>On the web:</strong> go to{' '}
                        <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://app.betaflight.com/delete">
                          app.betaflight.com/delete
                        </a>
                        , sign in, select <strong>Delete account</strong> and confirm.
                      </li>
                      <li>
                        <strong>By email:</strong> email{' '}
                        <a className="fancy-link" href="mailto:privacy@betaflight.com">
                          privacy@betaflight.com
                        </a>{' '}
                        from the address on your account and ask us to delete it.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-600 mb-3">What is deleted</h3>
                    <p className="mb-2">
                      Deleting your account permanently removes your profile (name, email address, address and avatar), passkeys, sign-in tokens and cloud backups from Betaflight servers. Deletion
                      completes within 30 days.
                    </p>
                    <p>Anonymous app usage statistics use a random install ID that isn't linked to your account, so they aren't affected. You can turn them off in the app's Options.</p>
                  </div>
                  <p>
                    For more about the data we keep, see our{' '}
                    <a className="fancy-link" href="/privacy">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Getting help</h2>
                <ul className="list-disc ml-8 space-y-1">
                  <li>
                    Check whether your flight controller is supported in the{' '}
                    <a className="fancy-link" href="/docs/wiki/getting-started/hardware-support">
                      hardware support
                    </a>{' '}
                    guide.
                  </li>
                  <li>
                    Browse the{' '}
                    <a className="fancy-link" href="/docs/wiki">
                      documentation
                    </a>{' '}
                    for setup, tuning and troubleshooting guides.
                  </li>
                  <li>
                    Report a bug or request a feature on GitHub for the{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://github.com/betaflight/betaflight-configurator/issues">
                      Betaflight App
                    </a>{' '}
                    or the{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://github.com/betaflight/betaflight/issues">
                      firmware
                    </a>
                    .
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </HomepageFeature>
      </div>
    </BetaflightLayout>
  );
}
