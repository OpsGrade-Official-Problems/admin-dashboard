import { paths } from '@/shared/paths'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full h-full p-12'>
      <h1 className='text-2xl font-bold'>Home</h1>

      <Link href={paths.login} className='text-blue-400 underline'>
        Login
      </Link>
    </div>
  )
}
