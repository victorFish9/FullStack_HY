import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'


test('renders title and author by default but not URL or likes', () => {
    const blog = {
        title: 'Testing React Components',
        user: { name: 'Test User', username: 'testuser' },
        url: 'http://example.com',
        likes: 5,
    }

    render(
        <Blog
            blog={blog}
            updateBlog={() => { }}
            handleDelete={() => { }}
            user={{ username: 'testuser' }}
        />
    )

    const titleAuthor = screen.getByText((content, element) => {
        const hasText = (node) =>
            node.textContent === 'Testing React Components by Test User'
        const nodeHasText = hasText(element)
        const childrenDontHaveText = Array.from(element.children).every(
            (child) => !hasText(child)
        )
        return nodeHasText && childrenDontHaveText
    })
    expect(titleAuthor).toBeDefined()

    const url = screen.queryByText('URL: http://example.com')
    const likes = screen.queryByText('Likes: 5')

    expect(url).toBeNull()
    expect(likes).toBeNull()
})

test('renders URL and likes when "view" button is clicked', async () => {
    const blog = {
        title: 'Testing React Components',
        user: { name: 'Test User', username: 'testuser' },
        url: 'http://example.com',
        likes: 5,
    }

    const user = { username: 'testuser' }

    render(
        <Blog
            blog={blog}
            updateBlog={() => { }}
            handleDelete={() => { }}
            user={user}
        />
    )

    expect(screen.queryByText('URL: http://example.com')).toBeNull()
    expect(screen.queryByText('Likes: 5')).toBeNull()

    const viewButton = screen.getByText('view')
    const userEventInstance = userEvent.setup()
    await userEventInstance.click(viewButton)

    expect(screen.getByText('URL: http://example.com')).toBeDefined()
    expect(screen.getByText('Likes: 5')).toBeDefined()
})

test('calls event handler twice when the like button is clicked twice', async () => {
    const blog = {
        title: 'Testing React Components',
        user: { name: 'Test User', username: 'testuser' },
        url: 'http://example.com',
        likes: 5,
    }

    const mockUpdateBlog = vi.fn()

    render(
        <Blog
            blog={blog}
            updateBlog={mockUpdateBlog}
            handleDelete={() => { }}
            user={{ username: 'testuser' }}
        />
    )

    const userEventInstance = userEvent.setup()
    const viewButton = screen.getByText('view')
    await userEventInstance.click(viewButton)

    const likeButton = screen.getByText('like')
    await userEventInstance.click(likeButton)
    await userEventInstance.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
})

test('calls event handler with correct details when a new blog is created', async () => {
    const mockCreateBlog = vi.fn()

    render(<BlogForm createBlog={mockCreateBlog} />)

    const userEventInstance = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    await userEventInstance.type(titleInput, 'Testing React Forms')
    await userEventInstance.type(authorInput, 'Test Author')
    await userEventInstance.type(urlInput, 'http://example.com')

    const submitButton = screen.getByText('create')
    await userEventInstance.click(submitButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
        title: 'Testing React Forms',
        author: 'Test Author',
        url: 'http://example.com',
    })
})
