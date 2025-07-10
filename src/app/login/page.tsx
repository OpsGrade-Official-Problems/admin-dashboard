import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { paths } from '@/shared/paths'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <form className='w-full h-full p-12 flex flex-col gap-2'>
      <Link href={paths.home} className='text-blue-400 underline'>
        back
      </Link>

      <h1 className='text-2xl font-bold mb-8'>Login</h1>

      <label className='font-medium'>Username</label>
      <Input type='text' placeholder='username' />

      <label className='font-medium'>Password</label>
      <Input type='password' placeholder='password' />

      <Button className='mt-4'>submit</Button>
    </form>
  )
}

export default Page
