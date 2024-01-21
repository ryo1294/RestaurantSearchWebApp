import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <header>
        <Link to="/" className='topLink'>
          <h1>レストラン検索</h1>
        </Link>
      </header>
    </>
  )
}

export default Header;