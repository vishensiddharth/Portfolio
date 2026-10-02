import { NextResponse } from 'next/server'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = client_id && client_secret ? Buffer.from(`${client_id}:${client_secret}`).toString('base64') : ''
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

async function getAccessToken() {
  if (!basic || !refresh_token) return null

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      cache: 'no-store',
    })

    return response.json()
  } catch (e) {
    console.error('Error fetching Spotify token:', e)
    return null
  }
}

export async function GET() {
  // If credentials are provided, attempt real Spotify fetch
  if (client_id && client_secret && refresh_token) {
    try {
      const tokenData = await getAccessToken()
      const access_token = tokenData?.access_token

      if (access_token) {
        const res = await fetch(NOW_PLAYING_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          cache: 'no-store',
        })

        if (res.status === 200) {
          const song = await res.json()
          if (song.item) {
            const isPlaying = song.is_playing
            const title = song.item.name
            const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ')
            const album = song.item.album.name
            const albumImageUrl = song.item.album.images[0]?.url
            const songUrl = song.item.external_urls.spotify

            return NextResponse.json({
              isPlaying,
              title,
              artist,
              album,
              albumImageUrl,
              songUrl,
            })
          }
        }

        // Fallback to recently played
        const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
          headers: { Authorization: `Bearer ${access_token}` },
          cache: 'no-store',
        })

        if (recentRes.status === 200) {
          const recent = await recentRes.json()
          const item = recent.items?.[0]?.track
          if (item) {
            return NextResponse.json({
              isPlaying: false,
              title: item.name,
              artist: item.artists.map((_artist: { name: string }) => _artist.name).join(', '),
              album: item.album.name,
              albumImageUrl: item.album.images[0]?.url,
              songUrl: item.external_urls.spotify,
            })
          }
        }
      }
    } catch (e) {
      console.warn('Spotify live query failed, serving curated track:', e)
    }
  }

  // Curated Coding Playlist Fallback
  return NextResponse.json({
    isPlaying: true,
    title: 'Synthwave & Deep Focus Coding',
    artist: 'Sid’s Engineering Playlist',
    album: 'Code & Flow',
    albumImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80',
    songUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
    isCurated: true,
  })
}
