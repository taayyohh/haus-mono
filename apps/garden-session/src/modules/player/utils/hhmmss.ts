export const hhmmss = (secs: string) => {
  let sec_num = parseInt(secs, 10)
  let hours = Math.floor(sec_num / 3600)
  let minutesNum = Math.floor((sec_num - hours * 3600) / 60)
  let secondsNum = sec_num - hours * 3600 - minutesNum * 60

  let minutes = minutesNum.toString()
  let seconds = secondsNum.toString()

  if (minutesNum < 10) {
    minutes = '0' + minutes
  }
  if (secondsNum < 10) {
    seconds = '0' + seconds
  }

  return minutes + ':' + seconds
}
