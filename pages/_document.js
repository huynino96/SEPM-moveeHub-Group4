import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" type="image/png" href="/images/favicon.png" />
                    <link href="/css/slick.css" rel="stylesheet" />
                    <link href="/css/bootstrap.min.css" rel="stylesheet" />
                    <link href="/css/venobox.css" rel="stylesheet" />
                    <link href="/css/style.css" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="/js/jquery-2.2.4.min.js" />
                    <script src="/js/jquery-ui.min.js" />
                    <script src="/js/bootstrap.min.js" />
                    <script src="/js/headhesive.min.js" />
                    <script src="/js/matchHeight.min.js" />
                    <script src="/js/modernizr.custom.js" />
                    <script src="/js/slick.min.js" />
                    <script src="/js/arrive.min.js" />
                    <script src="/js/venobox.min.js" />
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDRV18c6Tf7lrtyDmRj_l8m_afOVP1ZnI" />
                    <script src="/js/gmap3.min.js" />
                    <script src="/js/4dfd2d448a.js" />
                    <script src="/js/custom.js" />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
