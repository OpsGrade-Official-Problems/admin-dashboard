import { paths } from '@/shared/paths'
import Link from 'next/link'
import React from 'react'

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Moderator',
  },
]

const Page = () => {
  return (
    <div className='p-6'>
      <Link href={paths.home} className='text-blue-600 hover:underline'>
        back
      </Link>

      <h1 className='text-2xl font-semibold my-4'>Analytics: User Table</h1>

      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2 border-b text-left'>ID</th>
              <th className='px-4 py-2 border-b text-left'>Name</th>
              <th className='px-4 py-2 border-b text-left'>Email</th>
              <th className='px-4 py-2 border-b text-left'>Role</th>
            </tr>
          </thead>
          
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className='hover:bg-gray-50'>
                <td className='px-4 py-2 border-b'>{user.id}</td>
                <td className='px-4 py-2 border-b'>{user.name}</td>
                <td className='px-4 py-2 border-b'>{user.email}</td>
                <td className='px-4 py-2 border-b'>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
