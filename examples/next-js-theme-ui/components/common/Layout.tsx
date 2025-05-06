/** @jsxImportSource theme-ui */
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { KhulnasoftContent } from '@khulnasoft.com/react'
import themesMap from '@config/theme'
import '@khulnasoft.com/widgets'
import seoConfig from '@config/seo.json'
import HeaderSample from './HeaderSample'
import Head from './Head'

const Layout: React.FC<{ pageProps: any }> = ({ children, pageProps }) => {
  const khulnasoftTheme = pageProps.theme
  return (
    <KhulnasoftContent isStatic content={khulnasoftTheme} model="theme">
      {(data, loading) => {
        if (loading && !khulnasoftTheme) {
          return 'loading ...'
        }

        const colorOverrides = data?.colorOverrides
        const siteSeoInfo = data?.siteInformation
        const themeName = data?.theme || 'base'
        const theme = {
          ...themesMap[themeName],
          colors: {
            ...themesMap[themeName].colors,
            ...colorOverrides,
          },
        }

        return (
          <>
            <Head seoInfo={siteSeoInfo || seoConfig} />
            <ThemeProvider theme={theme}>
              <div
                sx={{
                  margin: `0 auto`,
                  px: 20,
                  maxWidth: 1920,
                  minWidth: '60vw',
                  minHeight: 800,
                }}
              >
                <HeaderSample title="Sample Themed Header" />
                <main>{children}</main>
              </div>
            </ThemeProvider>
          </>
        )
      }}
    </KhulnasoftContent>
  )
}

export default Layout
