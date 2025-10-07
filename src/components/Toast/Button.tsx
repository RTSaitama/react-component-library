import React from 'react'

type Props = {
  name?: string;
  onClick?: () => void;
}

export default function Button({name, onClick }: Props) {
  return (
    <div onClick={onClick} className={`button ${name?.toLowerCase()}`}>
      {name}
      </div>
  )
}