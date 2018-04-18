import Link from 'next/link';

export default () => (
  <ul>
    <li><Link href="/"><a>home</a></Link></li>
    <li><Link href="/cards"><a>cards</a></Link></li>
    <li><Link href="/admin"><a>admin</a></Link></li>
  </ul>
)
