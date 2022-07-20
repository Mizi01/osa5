import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Antti Ruuskanen',
    url: 'www.gogogog.fi',
    likes: 15,
    user: {
      username: 'veikko',
      name: 'Veikko Lavi',
      id: 'fjdsakl9324rjkaw'
    }
  }

  const likeHandler = jest.fn()
  //const visiblyHandler = jest.fn()

  beforeEach(() => {
    render(<Blog blog={blog} handleLike={likeHandler} user={blog.user}/>)
  })

  test('renders content', () => {
    expect(screen.findByText('Antti Ruuskanen')).toBeDefined()
    expect(screen.queryByText('like')).toBeNull()
  })

  test('renders url and like when all view-button is pressed', async () => {
    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)
    const author = screen.findByText('Antti Ruuskanen')
    const likes = screen.findByText('15')
    expect(author).toBeDefined()
    expect(screen.findByText('www.gogogog.fi')).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('renders right amount when user presses like-button', async () => {
    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
}
)