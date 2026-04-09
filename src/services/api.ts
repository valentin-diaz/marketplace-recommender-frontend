import client from './client'
import books from '@/mocks/books.json'

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