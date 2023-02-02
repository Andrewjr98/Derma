import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex justify-center">
        <div className="col-start-2 col-span-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Current Profiles..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
