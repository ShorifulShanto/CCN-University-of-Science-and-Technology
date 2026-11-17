import React from 'react';

interface SakuraBranchProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: 'large' | 'small' | 'corner';
}

export default function SakuraBranch({ className = '', style, variant = 'large' }: SakuraBranchProps) {
  return (
    <div
      className={`animate-branch-sway pointer-events-none select-none ${className}`}
      style={style}
    >
      <svg
        viewBox="0 0 500 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        <g id="branch-group">
          {/* Main Dark Branch Trunk */}
          <path
            d="M500,20 C420,35 360,65 310,85 C260,105 210,95 160,115 C110,135 60,125 0,165"
            stroke="#2B1810"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Secondary Sub-branches */}
          <path
            d="M360,65 C330,40 290,30 250,25"
            stroke="#2B1810"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M270,100 C240,125 190,140 140,150"
            stroke="#2B1810"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M180,110 C160,85 120,70 80,65"
            stroke="#2B1810"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M90,135 C70,155 30,170 0,185"
            stroke="#2B1810"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Individual Sakura Flower Clusters */}
          {/* Cluster 1 - Top Branch */}
          <g transform="translate(250, 25)">
            <circle cx="0" cy="0" r="10" fill="#E86C7D" opacity="0.9" />
            <circle cx="-6" cy="-4" r="8" fill="#F4D9DE" />
            <circle cx="6" cy="-4" r="8" fill="#F4D9DE" />
            <circle cx="-6" cy="6" r="8" fill="#E86C7D" />
            <circle cx="6" cy="6" r="8" fill="#8B1E2D" />
            <circle cx="0" cy="0" r="3.5" fill="#FAF8F5" />
          </g>
          <g transform="translate(290, 30)">
            <circle cx="0" cy="0" r="12" fill="#8B1E2D" />
            <circle cx="-8" cy="-5" r="9" fill="#E86C7D" />
            <circle cx="8" cy="-5" r="9" fill="#F4D9DE" />
            <circle cx="-8" cy="7" r="9" fill="#E86C7D" />
            <circle cx="8" cy="7" r="9" fill="#8B1E2D" />
            <circle cx="0" cy="0" r="4" fill="#FFEAA7" />
          </g>

          {/* Cluster 2 - Middle Trunk */}
          <g transform="translate(360, 65)">
            <circle cx="0" cy="0" r="14" fill="#E86C7D" opacity="0.85" />
            <circle cx="-10" cy="-6" r="10" fill="#8B1E2D" />
            <circle cx="10" cy="-6" r="10" fill="#F4D9DE" />
            <circle cx="-10" cy="8" r="10" fill="#E86C7D" />
            <circle cx="10" cy="8" r="10" fill="#8B1E2D" />
            <circle cx="0" cy="0" r="4" fill="#FAF8F5" />
          </g>

          <g transform="translate(310, 85)">
            <circle cx="-7" cy="-7" r="8" fill="#F4D9DE" />
            <circle cx="7" cy="-7" r="8" fill="#E86C7D" />
            <circle cx="-7" cy="7" r="8" fill="#8B1E2D" />
            <circle cx="7" cy="7" r="8" fill="#F4D9DE" />
            <circle cx="0" cy="0" r="3" fill="#8B1E2D" />
          </g>

          {/* Cluster 3 - Mid-Left Sub-branch */}
          <g transform="translate(210, 95)">
            <circle cx="0" cy="0" r="11" fill="#8B1E2D" />
            <circle cx="-8" cy="-5" r="8" fill="#F4D9DE" />
            <circle cx="8" cy="-5" r="8" fill="#E86C7D" />
            <circle cx="-8" cy="6" r="8" fill="#E86C7D" />
            <circle cx="8" cy="6" r="8" fill="#8B1E2D" />
            <circle cx="0" cy="0" r="3.5" fill="#FAF8F5" />
          </g>

          <g transform="translate(180, 110)">
            <circle cx="-6" cy="-6" r="7" fill="#E86C7D" />
            <circle cx="6" cy="-6" r="7" fill="#F4D9DE" />
            <circle cx="-6" cy="6" r="7" fill="#8B1E2D" />
            <circle cx="6" cy="6" r="7" fill="#E86C7D" />
            <circle cx="0" cy="0" r="2.5" fill="#FAF8F5" />
          </g>

          {/* Cluster 4 - Lower Left Tip */}
          <g transform="translate(120, 120)">
            <circle cx="0" cy="0" r="10" fill="#E86C7D" />
            <circle cx="-7" cy="-4" r="7" fill="#F4D9DE" />
            <circle cx="7" cy="-4" r="7" fill="#8B1E2D" />
            <circle cx="-7" cy="5" r="7" fill="#E86C7D" />
            <circle cx="7" cy="5" r="7" fill="#F4D9DE" />
            <circle cx="0" cy="0" r="3" fill="#FAF8F5" />
          </g>

          <g transform="translate(60, 125)">
            <circle cx="-5" cy="-5" r="6" fill="#F4D9DE" />
            <circle cx="5" cy="-5" r="6" fill="#E86C7D" />
            <circle cx="-5" cy="5" r="6" fill="#8B1E2D" />
            <circle cx="5" cy="5" r="6" fill="#F4D9DE" />
            <circle cx="0" cy="0" r="2" fill="#FAF8F5" />
          </g>

          {/* Flower Buds and Petal Accents */}
          <circle cx="410" cy="45" r="4" fill="#8B1E2D" />
          <circle cx="340" cy="45" r="3.5" fill="#E86C7D" />
          <circle cx="230" cy="60" r="4" fill="#F4D9DE" />
          <circle cx="150" cy="85" r="3" fill="#8B1E2D" />
          <circle cx="80" cy="110" r="3.5" fill="#E86C7D" />
          <circle cx="30" cy="145" r="3" fill="#F4D9DE" />
        </g>
      </svg>
    </div>
  );
}
