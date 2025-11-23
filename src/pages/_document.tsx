import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    const nonce = (this.props as any).nonce;

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  const nonce = ctx.res?.getHeader("x-nonce") || "";
  return { ...initialProps, nonce };
};

export default MyDocument;
