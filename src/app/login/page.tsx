'use client'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { endpoints, paths } from '@/shared/paths'
import Link from 'next/link'
import React, { FormEvent, useCallback, useState } from 'react'

const Page = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // TODO: is useCallback even necessary in React 19?
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        const response = await fetch(
          `http://localhost:3000${endpoints.login}`,
          {
            method: 'POST',
            body: JSON.stringify({ username, password }),
          }
        )
        const body = await response.json()

        console.log('response = ', JSON.stringify(body))
      } catch (error) {
        console.log('error = ', JSON.stringify(error))
      }
    },
    [password, username]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full h-full p-12 flex flex-col gap-2'
    >
      <Link href={paths.home} className='text-blue-400 underline'>
        back
      </Link>

      <h1 className='text-2xl font-bold mb-8'>Login</h1>

      <label className='font-medium'>Username</label>
      <Input
        type='text'
        placeholder='username'
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label className='font-medium'>Password</label>
      <Input
        type='password'
        placeholder='password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button className='mt-4'>submit</Button>
    </form>
  )
}

export default Page
