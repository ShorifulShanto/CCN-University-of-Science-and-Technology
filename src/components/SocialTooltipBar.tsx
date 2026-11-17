import React from 'react';

interface SocialTooltipBarProps {
  className?: string;
}

/**
 * From Uiverse.io by Itskrish01
 * High-performance 3D frosted glass glowing social buttons
 * Compact size with vibrant neon glow effect on hover
 */
export default function SocialTooltipBar({ className = '' }: SocialTooltipBarProps) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Button 1: Facebook / Community */}
      <div className="relative group flex items-center justify-center">
        {/* Vibrant Ambient Glow behind button on hover */}
        <div className="absolute -inset-1 rounded-full bg-[#1877F2] opacity-0 group-hover:opacity-75 blur-md transition-all duration-300 pointer-events-none group-hover:scale-110" />

        <a
          href="https://www.facebook.com/share/g/1BSCxnDhHX/"
          target="_blank"
          rel="noopener noreferrer"
          title="CCNUST Official Facebook Community"
          aria-label="CCNUST Facebook Community"
          className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md border border-[#1877F2]/40 bg-gradient-to-tr from-[#0F172A] to-[#1E293B] shadow-md hover:shadow-[0_0_20px_rgba(24,119,242,0.8)] hover:border-[#1877F2] hover:ring-2 hover:ring-[#1877F2]/50 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out cursor-pointer overflow-hidden flex items-center justify-center"
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-[#1877F2] group-hover:fill-white transition-colors duration-300"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      </div>

      {/* Button 2: Spotify / Podcasts & Audio */}
      <div className="relative group flex items-center justify-center">
        {/* Vibrant Ambient Glow behind button on hover */}
        <div className="absolute -inset-1 rounded-full bg-[#1DB954] opacity-0 group-hover:opacity-75 blur-md transition-all duration-300 pointer-events-none group-hover:scale-110" />

        <a
          href="https://open.spotify.com/search/CCNUST"
          target="_blank"
          rel="noopener noreferrer"
          title="Spotify Campus Broadcasts"
          aria-label="Spotify Campus Audio"
          className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md border border-[#1DB954]/40 bg-gradient-to-tr from-[#0F172A] to-[#1E293B] shadow-md hover:shadow-[0_0_20px_rgba(29,185,84,0.8)] hover:border-[#1DB954] hover:ring-2 hover:ring-[#1DB954]/50 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out cursor-pointer overflow-hidden flex items-center justify-center"
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1DB954]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-[#1DB954] group-hover:fill-white transition-colors duration-300"
          >
            <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 30.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
          </svg>
        </a>
      </div>

      {/* Button 3: Discord / Student Community */}
      <div className="relative group flex items-center justify-center">
        {/* Vibrant Ambient Glow behind button on hover */}
        <div className="absolute -inset-1 rounded-full bg-[#5865F2] opacity-0 group-hover:opacity-75 blur-md transition-all duration-300 pointer-events-none group-hover:scale-110" />

        <a
          href="https://discord.gg/ccnust"
          target="_blank"
          rel="noopener noreferrer"
          title="CCNUST Student Discord Server"
          aria-label="CCNUST Student Discord Server"
          className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md border border-[#5865F2]/40 bg-gradient-to-tr from-[#0F172A] to-[#1E293B] shadow-md hover:shadow-[0_0_20px_rgba(88,101,242,0.8)] hover:border-[#5865F2] hover:ring-2 hover:ring-[#5865F2]/50 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out cursor-pointer overflow-hidden flex items-center justify-center"
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5865F2]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-[#5865F2] group-hover:fill-white transition-colors duration-300"
            viewBox="0 0 640 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M524.531 69.836a1.5 1.5 0 0 0-.764-.7A485.065 485.065 0 0 0 404.081 32.03a1.816 1.816 0 0 0-1.923.91 337.461 337.461 0 0 0-14.9 30.6 447.848 447.848 0 0 0-134.426 0 309.541 309.541 0 0 0-15.135-30.6 1.89 1.89 0 0 0-1.924-.91 483.689 483.689 0 0 0-119.688 37.107 1.712 1.712 0 0 0-.788.676C39.068 183.651 18.186 294.69 28.43 404.354a2.016 2.016 0 0 0 .765 1.375 487.666 487.666 0 0 0 146.825 74.189 1.9 1.9 0 0 0 2.063-.676A348.2 348.2 0 0 0 208.12 430.4a1.86 1.86 0 0 0-1.019-2.588 321.173 321.173 0 0 1-45.868-21.853 1.885 1.885 0 0 1-.185-3.126 251.047 251.047 0 0 0 9.109-7.137 1.819 1.819 0 0 1 1.9-.256c96.229 43.917 200.41 43.917 295.5 0a1.812 1.812 0 0 1 1.924.233 234.533 234.533 0 0 0 9.132 7.16 1.884 1.884 0 0 1-.162 3.126 301.407 301.407 0 0 1-45.89 21.83 1.875 1.875 0 0 0-1 2.611 391.055 391.055 0 0 0 30.014 48.815 1.864 1.864 0 0 0 2.063.7A486.048 486.048 0 0 0 610.7 405.729a1.882 1.882 0 0 0 .765-1.352c12.264-126.783-20.532-236.912-86.934-334.541zM222.491 337.58c-28.972 0-52.844-26.587-52.844-59.239s23.409-59.241 52.844-59.241c29.665 0 53.306 26.82 52.843 59.239 0 32.654-23.41 59.241-52.843 59.241zm195.38 0c-28.971 0-52.843-26.587-52.843-59.239s23.409-59.241 52.843-59.241c29.667 0 53.307 26.82 52.844 59.239 0 32.654-23.177 59.241-52.844 59.241z" />
          </svg>
        </a>
      </div>

      {/* Button 4: YouTube / Video Docs */}
      <div className="relative group flex items-center justify-center">
        {/* Vibrant Ambient Glow behind button on hover */}
        <div className="absolute -inset-1 rounded-full bg-[#FF0000] opacity-0 group-hover:opacity-75 blur-md transition-all duration-300 pointer-events-none group-hover:scale-110" />

        <a
          href="https://youtube.com/@ccnust"
          target="_blank"
          rel="noopener noreferrer"
          title="Watch CCNUST YouTube Documentaries"
          aria-label="CCNUST YouTube Channel"
          className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md border border-[#FF0000]/40 bg-gradient-to-tr from-[#0F172A] to-[#1E293B] shadow-md hover:shadow-[0_0_20px_rgba(255,0,0,0.8)] hover:border-[#FF0000] hover:ring-2 hover:ring-[#FF0000]/50 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out cursor-pointer overflow-hidden flex items-center justify-center"
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF0000]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-[#FF0000] group-hover:fill-white transition-colors duration-300"
            viewBox="0 0 576 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

