import React, { useEffect } from 'react';

const WikiPage = () => {
  useEffect(() => {
    window.location.replace('/docs/category/release-notes');
  }, []);

  return (
    <div>
      <h1>Redirecting...</h1>
      <p>
        If you are not redirected, <a href="https://betaflight.com">click here</a>.
      </p>
    </div>
  );
};

export default WikiPage;
