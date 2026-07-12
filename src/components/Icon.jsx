import React from 'react'

export default function Icon({ name, filled = false, className = '', style }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}`, ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
