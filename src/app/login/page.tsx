'use client'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { endpoints, paths } from '@/shared/paths'
import { useForm } from '@tanstack/react-form'
import Link from 'next/link'
import React, { FormEvent, useCallback } from 'react'

import z from 'zod'

const Page = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      // Pass a schema or function to validate
      onSubmit: z.object({
        username: z.string().min(1, 'Username is required!'),
        password: z.string().min(1, 'Password is required!'),
      }),
    },
    onSubmit: async ({ value }) => {
      const { username, password } = value

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
  })

  // TODO: is useCallback even necessary in React 19?
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      form.handleSubmit()
    },
    [form]
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
      <form.Field name='username'>
        {(field) => (
          <>
            <Input
              type='text'
              placeholder='username'
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />

            {!field.state.meta.isValid && (
              <em role='alert' className='text-red-500'>
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </>
        )}
      </form.Field>

      <label className='font-medium'>Password</label>
      <form.Field name='password'>
        {(field) => (
          <>
            <Input
              type='password'
              placeholder='password'
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />

            {!field.state.meta.isValid && (
              <em role='alert' className='text-red-500'>
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button className='mt-4' disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}

export default Page
