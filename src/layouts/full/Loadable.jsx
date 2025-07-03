import React, { Suspense } from 'react';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<FullScreenLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;