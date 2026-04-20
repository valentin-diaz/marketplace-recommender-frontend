import client from './client'
import books from '@/mocks/books.json'
import users from '@/mocks/users.json'
import type { Book } from '@/types/api/book'

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

export const getBooks = async(offset: number, limit: number, search?: string) => {
  try {
    // if (search) {
    //   const filteredBooks = books.data.filter(book =>
    //     book.title.toLowerCase().includes(search.toLowerCase()) ||
    //     book.author.toLowerCase().includes(search.toLowerCase())
    //   )
    //   return {
    //     data: filteredBooks.slice(offset, offset + limit),
    //     total: filteredBooks.length,
    //   }
    // }
    // return {
    //   data: books.data.slice(offset, offset + limit),
    //   total: books.data.length,
    // }
    const response = await client.get('/books', { params: { offset, limit, search } })
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
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

export const getYouWouldLoveBook = async (userId: number) => {
  try {
    return {
      data: books.data[Math.floor(Math.random() * books.data.length)] as Book,
    }
    const response = await client.get(`/users/${userId}/you-would-love`)
    return response.data
  } catch (error) {
    console.error(`Error fetching recommendation for user ${userId}:`, error)
    throw error
  }
}