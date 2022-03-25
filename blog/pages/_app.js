import '../styles/globals.css'
import App from 'next/app'
import 'antd/dist/antd.css'
import '../styles/static/pages/comm.css'
import '../styles/static/components/header.css'
import '../styles/static/pages/index.css'
import '../styles/static/components/author.css'
import '../styles/static/components/advertisement.css'
import '../styles/static/components/footer.css'
import '../styles/static/pages/content.css'
import 'markdown-navbar/dist/navbar.css'
import 'highlight.js/styles/monokai-sublime.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default App
