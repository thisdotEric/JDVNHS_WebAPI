import React, { FC } from 'react';

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}: NotFoundProps) => {
  return (
    <div>
      <p>Page not found</p>
    </div>
  );
};

export default NotFound;
