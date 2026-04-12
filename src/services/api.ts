import client from './client'
import books from '@/mocks/books.json'
import users from '@/mocks/users.json'

export const getFeaturedBooks = async () => {
  try {
    return books
    const response = await client.get('/books/featured')
    return response.data
  } catch (error) {
    console.error('Error fetching featured books:', error)
    throw error
  }
}

export const getUsers = async (offset: number, limit: number, search?: string) => {
  try {
    if (search) {
      const filteredUsers = users.data.filter(user =>
        user.mostReadCategory.toLowerCase().includes(search.toLowerCase())
      )
      return {
        data: filteredUsers.slice(offset, offset + limit),
        total: filteredUsers.length,
      }
    }
    return {
      data: users.data.slice(offset, offset + limit),
      total: users.data.length,
    }
    const response = await client.get('/users', { params: { offset, limit, search } })
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}