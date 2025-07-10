'use client'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'
import { endpoints, paths } from '@/shared/paths'
import { useForm } from '@tanstack/react-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback } from 'react'
import { toast } from 'sonner'

import z from 'zod'

const Page = () => {
  const router = useRouter()

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

        if (!response.ok) {
          throw response
        }

        await response.json()
        toast(`Login Successful!`)

        router.replace(paths.home)
      } catch (error) {
        console.log('error = ', JSON.stringify(error))

        if (error instanceof Response) {
          const body = await error.json()
          toast(`error: ${body.message}`)
        }
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

      <form.Field name='username'>
        {(field) => (
          <>
            <label htmlFor={field.name} className='font-medium'>
              Username
            </label>
            <Input
              type='text'
              placeholder='username'
              autoComplete='off'
              autoFocus
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(!field.state.meta.isValid && 'border-red-500')}
            />

            {!field.state.meta.isValid && (
              <em role='alert' className='text-red-500'>
                {field.state.meta.errors[0]?.message}
              </em>
            )}
          </>
        )}
      </form.Field>

      <form.Field name='password'>
        {(field) => (
          <>
            <label htmlFor={field.name} className='font-medium'>
              Password
            </label>
            <Input
              type='password'
              placeholder='password'
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(!field.state.meta.isValid && 'border-red-500')}
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
          <Button disabled={!canSubmit} className='mt-4 hover:cursor-pointer'>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}

export default Page
