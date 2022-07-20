import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('<Blogform /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()
  const author = screen.getByPlaceholderText('write here author')
  const title = screen.getByPlaceholderText('write here title')
  const url = screen.getByPlaceholderText('write here author')
  const sendButton = screen.getByText('save')
  expect(sendButton).toBeDefined()


  await user.type(author, 'Testi Testaaja' )
  await user.type(title, 'Testataan testausta' )
  await user.type(url, 'www.testata.an' )
  screen.debug()
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testataan testausta' )


})