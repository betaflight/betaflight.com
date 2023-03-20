import React from 'react';
import BetaflightLayout from '../components/Layout';

export default function Partner() {
  return (
    <BetaflightLayout>
      <div className="relative w-full mt-4 xl:mt-32">
        <div className="w-full h-fit flex flex-col justify-start">
          <div className="flex flex-col p-6 h-fit w-fit xl:ml-12">
            <h1 className="md:text-[6rem] text-6xl border-primary-500 font-bold mb-4">Verified Betaflight Partners</h1>
            {/* <h2 className="text-white font-semibold md:text-3xl text-xl">Downloads & Videos</h2> */}
          </div>
        </div>
      </div>
      <div className="w-full xl:max-w-[1920px] flex-grow p-4 xl:p-16 flex">
        <div className="flex-grow flex justify-center">
          <iframe className="max-w-[850px]" src="http://localhost:3000/img/sponsors/Betaflight_4.4_Verified.pdf#toolbar=0" width="100%" height="1000px"></iframe>
        </div>
      </div>
    </BetaflightLayout>
  );
}
