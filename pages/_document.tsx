import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
    return (
        <Html lang='en'>
            <Head>
                <meta name='description' content='Like a twitter, but emoji 🙃'/>
                <link rel='icon' href='/favicon.ico' sizes='any'/>
                <link rel='icon' href='/android-chrome-512x512.png' sizes='512x512' type='image/png'/>
                <link rel='icon' href='/android-chrome-192x192.png' sizes='192x192' type='image/png'/>
                <link rel='apple-touch-icon' href='/apple-touch-icon.png'/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
