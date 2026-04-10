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

export const getUsers = async () => {
  try {
    return users
    const response = await client.get('/users')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}