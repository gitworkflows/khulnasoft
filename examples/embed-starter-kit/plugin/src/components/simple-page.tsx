/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import { useLocalStore, useObserver } from 'mobx-react'
import { KhulnasoftContent } from '@khulnasoft.com/sdk'
import { useEffect } from 'react'
import { ApplicationContext } from '../interfaces/application-context'
import { Stack } from './stack'
import { Row } from './row'
import { CreatePage } from './create-page'

const context: ApplicationContext = require('@khulnasoft.com/app-context').default

async function edit(model: string) {
  const { user } = context

  const current = await fetch(
    // See https://www.khulnasoft.com/c/docs/query-api
    `https://cdn.khulnasoft.com/api/v3/content/${model}?apiKey=${user.apiKey}&query.published.$ne=archived&single=true&cachebust=true&fields=id`,
    {
      headers: user.authHeaders,
    }
  ).then((res) => res.json())

  context.location.go(`/content/${current.id}`)
}

/**
 * Khulnasoft app-wide page to list and create pages
 */
export function SimplePage() {
  const state = useLocalStore(() => ({
    pages: [] as KhulnasoftContent[],
    fetchingPages: false,
    get loading() {
      return state.fetchingPages
    },
    get pagesModel() {
      return context.models.result.find((item: any) => item.name === 'page')
    },

    async getPages() {
      state.fetchingPages = true
      const { user } = context
      const pages = await fetch(
        // See https://www.khulnasoft.com/c/docs/query-api
        `https://cdn.khulnasoft.com/api/v3/content/page?apiKey=${user.apiKey}&query.published.$ne=archived&limit=50&cachebust=true`,
        {
          headers: user.authHeaders,
        }
      ).then((res) => res.json())
      state.pages = Array.isArray(pages.results) ? pages.results : []
      state.fetchingPages = false
    },
    async createPage() {
      const close = await context.globalState.openDialog(
        <CreatePage context={context} onComplete={() => close()} />
      )
    },
  }))

  useEffect(() => {
    state.getPages()
  }, [])

  return useObserver(() => (
    <Stack>
      <Stack
        css={{
          maxWidth: 1000,
          padding: 20,
          margin: 'auto',
          width: '100%',
        }}
      >
        <Row
          css={{
            color: '#444',
            paddingBottom: 20,
          }}
        >
          <Typography css={{ fontSize: 32 }}>Pages</Typography>
          <Button
            css={{ marginLeft: 'auto' }}
            color="primary"
            variant="contained"
            onClick={state.createPage}
          >
            New Page
          </Button>
        </Row>

        {!state.pages.length && state.fetchingPages ? (
          <CircularProgress disableShrink css={{ margin: '50px auto' }} />
        ) : !state.pages.length ? (
          <Typography
            variant="caption"
            css={{ margin: 50, fontSize: 16, textAlign: 'center' }}
          >
            You have no pages, try creating one above
          </Typography>
        ) : (
          <Paper>
            <List>
              {state.pages?.map((item) => (
                <ListItem
                  key={item.id}
                  button
                  onClick={() => {
                    context.location.go(`/content/${item.id}`)
                  }}
                >
                  <ListItemText
                    primary={
                      item.name || (
                        <span css={{ opacity: 0.5 }}>(Unnamed page)</span>
                      )
                    }
                    secondary={item.published}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Row css={{ marginTop: 30 }}>
          <Button
            onClick={() => edit('header')}
            color="primary"
            css={{ flexGrow: 1 }}
            variant="outlined"
          >
            Edit header
          </Button>
          <Button
            onClick={() => edit('theme')}
            color="primary"
            css={{ flexGrow: 1, marginLeft: 20 }}
            variant="outlined"
          >
            Edit theme
          </Button>
        </Row>
      </Stack>
    </Stack>
  ))
}
