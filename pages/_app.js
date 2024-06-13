// pages/_app.js
import React from "react";
import App from "next/app";
import web3 from "../utils/web3";
import myToken from "../utils/myToken";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps} web3={web3} myToken={myToken} />
    );
  }
}

export default MyApp;
