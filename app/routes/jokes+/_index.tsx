import { json } from '@remix-run/node'
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import { db } from '~/utils/db.server'

export const loader = async () => {
  const count = await db.joke.count()
  const rand = Math.floor(Math.random() * count)
  const [joke] = await db.joke.findMany({
    skip: rand,
    take: 1,
  })

  if (!joke) {
    throw new Response('No random joke found', {
      status: 404,
    })
  }

  return json({ joke })
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="error-container">
        <p>There are no jokes to display.</p>
        <Link to="new">Add your own</Link>
      </div>
    )
  }
  return <div className="error-container">I did a whoopsies.</div>
}

export default function JokesIndexRoute() {
  const { joke } = useLoaderData<typeof loader>()

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{joke.content}</p>
      <Link to={joke.id}>"{joke.name}" Permalink</Link>
    </div>
  )
}
