import React from 'react'

const DateFormatter = ({ date }: { date: Date }) => {
  const monthNames = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]

  const formattedDate = `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`

  return <span>{formattedDate}</span>
}

export default DateFormatter
