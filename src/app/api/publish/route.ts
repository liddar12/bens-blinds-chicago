import { NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_PUBLISH_TOKEN || ''
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'liddar12'
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'bens-blinds-chicago'
const BASE_BRANCH = 'main'
const HEAD_BRANCH = 'content'

export async function POST(req: Request) {
  const secret = process.env.PUBLISH_SECRET
  if (secret) {
    const { authorization } = Object.fromEntries(req.headers)
    if (authorization !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_PUBLISH_TOKEN not configured' }, { status: 500 })
  }

  const apiBase = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }

  // Get the SHA of the head branch
  const headRes = await fetch(`${apiBase}/git/refs/heads/${HEAD_BRANCH}`, { headers })
  if (!headRes.ok) {
    const err = await headRes.text()
    console.error('[publish] Failed to get head ref', { branch: HEAD_BRANCH, status: headRes.status, body: err })
    return NextResponse.json({ error: `Failed to get ${HEAD_BRANCH} ref: ${err}` }, { status: 500 })
  }
  const headData = await headRes.json()
  const headSha: string = headData.object.sha
  console.log('[publish] Merging', { from: HEAD_BRANCH, to: BASE_BRANCH, sha: headSha })

  // Merge head into base
  const mergeRes = await fetch(`${apiBase}/merges`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      base: BASE_BRANCH,
      head: headSha,
      commit_message: `Publish: merge ${HEAD_BRANCH} → ${BASE_BRANCH} [skip ci skip tina]`,
    }),
  })

  if (mergeRes.status === 204) {
    console.log('[publish] No-op: already up to date')
    return NextResponse.json({ status: 'no-op', message: 'Already up to date — nothing to publish.' })
  }

  if (!mergeRes.ok) {
    const err = await mergeRes.text()
    console.error('[publish] Merge failed', { status: mergeRes.status, body: err })
    return NextResponse.json({ error: `Merge failed: ${err}` }, { status: 500 })
  }

  const mergeData = await mergeRes.json()
  console.log('[publish] Published successfully', { sha: mergeData.sha })
  return NextResponse.json({
    status: 'published',
    sha: mergeData.sha,
    message: 'Merged to main. Netlify will rebuild production in ~2 minutes.',
  })
}
