import Link from 'next/link'

export default function Footer() {
  return (
    <div className={'flex gap-4 pb-16'}>
      {/*<div>*/}
      {/*  <Link href={'/newsletter'}>Newsletter</Link>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <Link href={'/follow'}>Follow</Link>*/}
      {/*</div>*/}
      <div>
        <Link href={'/about'}>About</Link>
      </div>
      <div>
        <Link href={'/what'}>What</Link>
      </div>
      <div></div>
    </div>
  )
}
