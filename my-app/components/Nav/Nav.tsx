import React from 'react';
import Link from 'next/link';
const Nav = () => {
  return (
    <nav className="relative px-2 py-2 box-shadow">
      <div className="section-container flex justify-between items-center">
        <Link href="/">
          <img
            style={{
              height: '70px',
            }}
            src="https://i.ibb.co/dstb0Wqp/yatri.png"
            alt="Yatri Logo"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
