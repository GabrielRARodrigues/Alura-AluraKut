import { createGlobalStyle, ThemeProvider } from 'styled-components'

import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #d9e6f6;

  font-family: sans-serif;
}

#__next {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3'
  }
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
