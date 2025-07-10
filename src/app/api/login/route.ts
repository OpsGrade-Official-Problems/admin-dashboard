import { NextResponse } from 'next/server'

type LoginBody = {
  username: string
  password: string
}

// Example: Replace this with your actual auth logic
const mockUser = {
  username: 'admin',
  password: '1234', // DO NOT hardcode passwords like this in production
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody

    const { username, password } = body

    if (username === mockUser.username && password === mockUser.password) {
      return NextResponse.json({ success: true, message: 'Login successful' })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.log('error = ', JSON.stringify(error))

    return NextResponse.json(
      { success: false, message: 'Failed to parse request' },
      { status: 400 }
    )
  }
}
