import { createClient } from 'tinacms/dist/client'
import { queries } from '../../tina/__generated__/types'

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ''
const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || 'content'
const token = process.env.TINA_TOKEN || ''

export const tinaClient = createClient({
  url: clientId
    ? `https://content.tinajs.io/2.2/content/${clientId}/github/${branch}`
    : 'http://localhost:4001/graphql',
  token,
  queries,
})
