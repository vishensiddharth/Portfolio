'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SpotifyData {
  isPlaying: boolean
  title: string
  artist: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  isCurated?: boolean
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const res = await fetch('/api/spotify')
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch (e) {
        console.error('Failed to fetch Spotify track:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()
    // Poll every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading || !data) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-surface/40 text-muted font-mono text-xs">
        <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span>Connecting to audio stream...</span>
      </div>
    )
  }

  return (
    <motion.a
      href={data.songUrl || 'https://open.spotify.com'}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-3.5 px-4 py-2.5 rounded-2xl border border-white/10 bg-[rgba(8,12,20,0.85)] hover:border-[#1DB954]/50 hover:shadow-[0_0_25px_rgba(29,185,84,0.2)] backdrop-blur-xl transition-all duration-300 group max-w-sm text-left"
    >
      {/* Vinyl Disc Container */}
      <div className="relative flex-shrink-0">
        {/* Album Art / Vinyl Disc */}
        <div
          className={`w-11 h-11 rounded-full overflow-hidden border border-white/20 p-0.5 bg-black/40 flex items-center justify-center relative ${
            data.isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
          }`}
          style={{
            boxShadow: data.isPlaying ? '0 0 12px rgba(29, 185, 84, 0.4)' : 'none',
          }}
        >
          {data.albumImageUrl ? (
            <img
              src={data.albumImageUrl}
              alt={data.album || 'Album Art'}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#1DB954] to-accent flex items-center justify-center text-xs">
              🎵
            </div>
          )}
          {/* Vinyl center hole */}
          <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-[#080C14] border border-white/40" />
        </div>

        {/* Mini Spotify Logo Badge */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1DB954] flex items-center justify-center shadow">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#080C14">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#1DB954] font-semibold">
            {data.isCurated ? 'Coding Session' : data.isPlaying ? 'Now Playing' : 'Last Played'}
          </span>
        </div>

        <div className="text-xs font-semibold text-text truncate group-hover:text-[#1DB954] transition-colors">
          {data.title}
        </div>
        <div className="text-[11px] text-muted truncate font-mono">
          {data.artist}
        </div>
      </div>

      {/* Animated Equalizer Wave Bars */}
      <div className="flex items-end gap-[2.5px] h-4 flex-shrink-0 self-center pl-1">
        <span
          className={`w-[2px] rounded-full bg-[#1DB954] ${
            data.isPlaying ? 'animate-[bounce_0.8s_ease-in-out_infinite]' : 'h-1'
          }`}
          style={{ height: data.isPlaying ? '100%' : '3px' }}
        />
        <span
          className={`w-[2px] rounded-full bg-[#1DB954] ${
            data.isPlaying ? 'animate-[bounce_1.1s_ease-in-out_infinite]' : 'h-1.5'
          }`}
          style={{ height: data.isPlaying ? '70%' : '5px', animationDelay: '0.2s' }}
        />
        <span
          className={`w-[2px] rounded-full bg-[#1DB954] ${
            data.isPlaying ? 'animate-[bounce_0.9s_ease-in-out_infinite]' : 'h-2'
          }`}
          style={{ height: data.isPlaying ? '85%' : '8px', animationDelay: '0.4s' }}
        />
        <span
          className={`w-[2px] rounded-full bg-[#1DB954] ${
            data.isPlaying ? 'animate-[bounce_1.2s_ease-in-out_infinite]' : 'h-1'
          }`}
          style={{ height: data.isPlaying ? '60%' : '4px', animationDelay: '0.1s' }}
        />
      </div>
    </motion.a>
  )
}
