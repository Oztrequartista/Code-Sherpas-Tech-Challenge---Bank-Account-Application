import React from 'react'
import Head from "next/head";

const Seo = ({ title }) => {

  return (
    <Head>
      <title>{title} - expressPay</title>
      {/* <link href={favicon.src} rel="icon"></link> */}
      {/* <meta name="description" content="" />
      <meta name="author" content="" />
      <meta name="keywords" content=""></meta> */}
    </Head>
  )
}

export default Seo