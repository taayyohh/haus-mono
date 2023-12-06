import React, { ChangeEvent } from 'react'

interface FormInputProps {
  id: string
  name: string
  type: string
  value: string | number
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
  className?: string
}

const Input: React.FC<FormInputProps> = ({
  id,
  name,
  type,
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
      <input
        type={type}
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

export default Input
