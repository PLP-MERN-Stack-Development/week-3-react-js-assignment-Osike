import { Post } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export const apiService = {
  async getPosts(page = 1, limit = 10): Promise<{ posts: Post[]; total: number }> {
    try {
      const response = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`);
      
      if (!response.ok) {
        throw new APIError(`Failed to fetch posts: ${response.statusText}`, response.status);
      }

      const posts = await response.json();
      const total = parseInt(response.headers.get('x-total-count') || '100');
      
      return { posts, total };
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error occurred while fetching posts');
    }
  },

  async searchPosts(query: string): Promise<Post[]> {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      
      if (!response.ok) {
        throw new APIError(`Failed to search posts: ${response.statusText}`, response.status);
      }

      const posts = await response.json();
      
      return posts.filter((post: Post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error occurred while searching posts');
    }
  }
};