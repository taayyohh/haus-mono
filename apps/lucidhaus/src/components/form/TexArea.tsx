import React, { ChangeEvent } from 'react'

interface TextAreaProps {
  id: string
  name: string
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  label: string
  className?: string
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  value,
  error,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label htmlFor={id} className="text-xs font-medium uppercase">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}

export default TextArea
