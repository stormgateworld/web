export const prerender = false

export async function GET() {
  const response = await fetch(`https://api.stormgateworld.com/rss.xml`)
  const code = response.status
  const feed = await response.text()

  if (code === 200) {
    return new Response(feed, {
      status: code,
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "application/rss+xml",
      },
    })
  } else {
    return new Response("Server Error, please try again later! :(", {
      status: 500,
    })
  }
}
