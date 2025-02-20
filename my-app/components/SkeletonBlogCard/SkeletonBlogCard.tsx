import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonBlogCard = () => {
  return (
    <div className="blog-box">
      <div className="blog-img">
        <Skeleton height={300} />
      </div>
      <div className="blog-text">
        <Skeleton width={150} />
        <Skeleton height={20} />
        <Skeleton count={3} />
      </div>
    </div>
  );
};

export default SkeletonBlogCard;
