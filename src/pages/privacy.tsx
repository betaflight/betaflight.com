import React from 'react';
import BetaflightLayout from '../components/Layout';
import HomepageFeature from '../components/HomepageFeature';

export default function PrivacyPolicy() {
  return (
    <BetaflightLayout>
      <div className="m-auto p-6 mt-0 xl:mt-16 w-full max-w-6xl">
        <HomepageFeature blur title="Privacy Policy">
          <div className="w-full max-w-5xl">
            <p className="text-sm mb-6 text-neutral-600 dark:text-neutral-400">
              <strong>Effective date:</strong> October 1, 2026
            </p>

            <div className="space-y-8 text-sm leading-relaxed">
              <p>Betaflight ("us", "we", or "our") operates the Website, the Betaflight App for desktop, web and Android, and the Betaflight app for iOS (collectively the "Service").</p>

              <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

              <p>
                We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined
                in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
              </p>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Information Collection And Use</h2>
                <p className="mb-4">We collect several different types of information for various purposes to provide and improve our Service to you.</p>

                <h3 className="text-xl font-bold text-primary-600 mt-6 mb-3">Types of Data Collected</h3>

                <div className="ml-4 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-primary-600 mb-2">Usage Data</h4>
                    <p className="mb-2">We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a device ("Usage Data").</p>
                    <p className="mb-2">
                      This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you
                      visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </p>
                    <p>
                      When you access the Service by or through a device, this Usage Data may include information such as the type of device you use, your device unique ID, the IP address of your
                      device, your operating system, the type of Internet browser you use, unique device identifiers and other diagnostic data.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-primary-600 mb-2">Betaflight Account</h4>
                    <p className="mb-2">
                      If you create or sign in to a Betaflight account, we collect your email address and, if you add them, your name, postal address, country and avatar, and keep them on Betaflight
                      servers. We use the email address to send one-time sign-in codes and to identify your account. Sign-in codes expire after 30 minutes or once used. Passkeys you register are kept
                      by your device or password manager; we store only the public key needed to verify them. Sign-in tokens are kept in secure storage on your device.
                    </p>
                    <p>Your account is linked to your email address. We use it only to run your account, and never sell it or use it for advertising.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-primary-600 mb-2">Cloud Backups</h4>
                    <p>
                      When you choose to back up a flight controller, we store the backup with your account on Betaflight servers: the craft name, board, firmware version, flight controller serial
                      number and the configuration itself. Backups are only created when you ask for one.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-primary-600 mb-2">Location</h4>
                    <p className="mb-2">
                      The iOS app asks for your location only while it is in use, and only if you allow it. It uses your location to show the distance and bearing to your craft, and on the Conditions
                      screen to look up weather, elevation and airspace for where you are flying. Distance and bearing are worked out on your device.
                    </p>
                    <p className="mb-2">
                      The Betaflight App uses your craft's GPS position where it has one. Otherwise it can use your device's location, if you allow it, or an approximate location worked out from your
                      IP address, to set magnetic declination, centre the flight plan map and check airspace.
                    </p>
                    <p>Where a location is needed from an outside service, it is sent to the services listed under Service Providers. We do not receive or store your location.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-primary-600 mb-2">Flight Controller Data</h4>
                    <p>
                      The Betaflight App and the iOS app read and change your flight controller's settings over USB, Bluetooth or your local network. This data, including your craft's GPS position,
                      stays on your device unless you choose to save it as a cloud backup. The iOS app keeps your craft's last known position on the device so it can help you find the craft.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-primary-600 mb-2">Tracking & Cookies Data</h4>
                    <p className="mb-2">We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
                    <p className="mb-2">
                      Cookies are files with small amounts of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking
                      technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                    </p>
                    <p className="mb-2">Examples of Cookies we use:</p>
                    <ul className="list-disc ml-8 space-y-1">
                      <li>
                        <strong>Session Cookies.</strong> We use Session Cookies to operate our Service.
                      </li>
                      <li>
                        <strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.
                      </li>
                    </ul>
                    <p className="mt-2">The iOS app does not use cookies, analytics or tracking, and does not show advertising.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Use of Data</h2>
                <p className="mb-2">We use the collected data for various purposes:</p>
                <ul className="list-disc ml-8 space-y-1">
                  <li>To provide and maintain the Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                  <li>To provide customer care and support</li>
                  <li>To provide analysis or valuable information so that we can improve the Service</li>
                  <li>To monitor the usage of the Service</li>
                  <li>To detect, prevent and address technical issues</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Retention and Deletion</h2>
                <p className="mb-2">We keep your account and cloud backups until you delete them.</p>
                <ul className="list-disc ml-8 space-y-1 mb-2">
                  <li>You can delete individual cloud backups at any time in the Betaflight App or the iOS app.</li>
                  <li>
                    You can delete your account from the account screen in the Betaflight App or the iOS app, or on the web at{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://app.betaflight.com/delete">
                      app.betaflight.com/delete
                    </a>
                    . Deleting your account permanently removes your profile, cloud backups, passkeys and sign-in tokens from Betaflight servers, and completes within 30 days. See{' '}
                    <a className="fancy-link" href="/support#delete-account">
                      how to delete your account
                    </a>
                    .
                  </li>
                  <li>
                    You can also ask us to delete your account, or to send you a copy of your data, by emailing{' '}
                    <a className="fancy-link" href="mailto:privacy@betaflight.com">
                      privacy@betaflight.com
                    </a>
                    .
                  </li>
                </ul>
                <p>
                  Data kept only on your device, such as settings, recent connections and your craft's last known position, is removed when you delete the app. You can withdraw location access at any
                  time in your device settings, and sign out to stop using your account on that device.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Transfer Of Data</h2>
                <p className="mb-2">
                  Your information, including Personal Data, may be transferred to and maintained on computers located outside of your state, province, country or other governmental jurisdiction where
                  the data protection laws may differ than those from your jurisdiction.
                </p>
                <p className="mb-2">
                  If you are located outside of Australia or the United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to Australia or
                  the United States and process it there.
                </p>
                <p className="mb-2">Where required, we rely on appropriate safeguards for such transfers, including Standard Contractual Clauses and other measures to protect your Personal Data.</p>
                <p className="mb-2">Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                <p>
                  We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take
                  place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Disclosure Of Data</h2>
                <h3 className="text-xl font-bold text-primary-600 mt-6 mb-3">Legal Requirements</h3>
                <p className="mb-2">We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                <ul className="list-disc ml-8 space-y-1">
                  <li>To comply with a legal obligation</li>
                  <li>To protect and defend our rights or property</li>
                  <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                  <li>To protect the personal safety of users of the Service or the public</li>
                  <li>To protect against legal liability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Security Of Data</h2>
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use
                  commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Service Providers</h2>
                <p className="mb-2">
                  We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to
                  assist us in analyzing how our Service is used.
                </p>
                <p className="mb-4">
                  These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>

                <h3 className="text-xl font-bold text-primary-600 mt-6 mb-3">Location, Maps, Weather and Airspace</h3>
                <p className="mb-4">
                  The Betaflight App and the iOS app fetch some information directly from these services. Each request carries the coordinates or map area involved, along with your IP address as with
                  any internet request. No account details or other identifiers are sent. Airspace services are only contacted if you turn them on and enter your own key for that service.
                </p>

                <ul className="list-disc ml-8 space-y-1 mb-4">
                  <li>
                    Open-Meteo, for weather and elevation in the iOS app:{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://open-meteo.com/en/terms">
                      open-meteo.com/en/terms
                    </a>
                  </li>
                  <li>
                    NOAA Space Weather Prediction Center, for the planetary K-index in the iOS app (no location is sent):{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://www.noaa.gov/protecting-your-privacy">
                      noaa.gov/protecting-your-privacy
                    </a>
                  </li>
                  <li>
                    FAA NOTAM API, for airspace notices if you choose it:{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://www.faa.gov/privacy">
                      faa.gov/privacy
                    </a>
                  </li>
                  <li>
                    OpenAIP, for airspace if you choose it:{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://www.openaip.net/legal#privacy-policy">
                      openaip.net/legal
                    </a>
                  </li>
                  <li>
                    ipapi.co and GeoJS, for an approximate location from your IP address in the Betaflight App:{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://ipapi.co/privacy/">
                      ipapi.co/privacy
                    </a>{' '}
                    and{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://www.geojs.io/privacy/">
                      geojs.io/privacy
                    </a>
                  </li>
                  <li>
                    OpenStreetMap, for street maps in the Betaflight App:{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://osmfoundation.org/wiki/Privacy_Policy">
                      osmfoundation.org/wiki/Privacy_Policy
                    </a>
                  </li>
                  <li>
                    Google Maps, for satellite maps in the Betaflight App:{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy">
                      policies.google.com/privacy
                    </a>
                  </li>
                  <li>
                    Apple Maps, for maps in the iOS app:{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://www.apple.com/legal/privacy/">
                      apple.com/legal/privacy
                    </a>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-primary-600 mt-6 mb-3">Analytics</h3>
                <p className="mb-4">We may use third-party Service Providers to monitor and analyze the use of the Website and the Betaflight App. The iOS app does not use them.</p>

                <div className="space-y-4 ml-4">
                  <div className="bg-neutral-500/5 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-primary-600 mb-2">Google Analytics</h4>
                    <p className="mb-2">
                      Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service.
                      This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
                    </p>
                    <p>
                      For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page:{' '}
                      <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=en">
                        policies.google.com/privacy
                      </a>
                    </p>
                  </div>

                  <div className="bg-neutral-500/5 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-primary-600 mb-2">Telemetry Deck</h4>
                    <p className="mb-2">Telemetry Deck is a telemetry and analytics service offered by TelemetryDeck GmbH. We use it to measure app events and performance.</p>
                    <p className="mb-2">We configure Telemetry Deck to avoid collecting directly identifying information (such as names or email addresses) unless hashed.</p>
                    <p>
                      For more information on the privacy practices of TelemetryDeck GmbH, please visit the TelemetryDeck GmbH Privacy & Terms web page:{' '}
                      <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://telemetrydeck.com/privacy/">
                        telemetrydeck.com/privacy
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Links To Other Sites</h2>
                <p className="mb-2">
                  Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you
                  to review the Privacy Policy of every site you visit.
                </p>
                <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Children's Privacy</h2>
                <p className="mb-2">Our Service does not address anyone under the age of 18 ("Children").</p>
                <p>
                  We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and become aware that your child has provided us with
                  Personal Data, please contact us. If we become aware that we have collected Personal Data from a minor without verification of parental consent, we will remove that information from
                  our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Changes To This Privacy Policy</h2>
                <p className="mb-2">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                <p className="mb-2">
                  We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
                </p>
                <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">Contact Us</h2>
                <p className="mb-2">If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-disc ml-8">
                  <li>
                    By email:{' '}
                    <a className="fancy-link" href="mailto:privacy@betaflight.com">
                      privacy@betaflight.com
                    </a>
                  </li>
                  <li>
                    By lodging an issue on{' '}
                    <a className="fancy-link" target="_blank" rel="noopener noreferrer" href="https://github.com/betaflight/betaflight.com/issues">
                      GitHub
                    </a>
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
