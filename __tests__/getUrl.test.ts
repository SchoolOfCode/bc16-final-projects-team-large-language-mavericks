import { getUrl } from '../lib/readExternalContent'
import { jest } from '@jest/globals'

// Mock the '@notionhq/client' module
jest.mock('@notionhq/client', () => {
  // Index to alternate between mock responses
  let mockResponseIndex = 0

  return {
    Client: jest.fn(() => ({
      databases: {
        query: jest.fn(() => {
          // Define mock responses
          const mockResponses = [
            {
              results: [
                {
                  object: 'page',
                  id: 'pageId1',
                  properties: {
                    URL: {
                      type: 'url',
                      url: 'https://example.com/page1'
                    },
                    Name: {
                      type: 'title',
                      title: [{ plain_text: 'Page 1' }]
                    },
                    Tags: {
                      type: 'multi_select',
                      multi_select: [{ name: 'tag1' }, { name: 'tag2' }]
                    }
                  }
                },
                {
                  object: 'page',
                  id: 'pageId2',
                  properties: {
                    URL: {
                      type: 'url',
                      url: 'https://example.com/page2'
                    },
                    Name: {
                      type: 'title',
                      title: [{ plain_text: 'Page 2' }]
                    },
                    Tags: {
                      type: 'multi_select',
                      multi_select: [{ name: 'tag3' }, { name: 'tag4' }]
                    }
                  }
                }
              ]
            },
            // Mock response with empty array
            { results: [] }
          ]

          // Return alternate mock responses (empty array or pages)
          return mockResponses[mockResponseIndex++ % mockResponses.length]
        })
      }
    }))
  }
})

// Test suite
describe('getUrl function', () => {
  beforeEach(() => {
    // Make sure to clear all mock calls before each test
    jest.clearAllMocks()
  })

  // Test case 1 - pages
  it('should return an array of objects containing url, pageId, pageName, and tags', async () => {
    const result = await getUrl()
    expect(result).toEqual([
      {
        url: 'https://example.com/page1',
        pageId: 'pageId1',
        pageName: 'Page 1',
        tag: ['tag1', 'tag2']
      },
      {
        url: 'https://example.com/page2',
        pageId: 'pageId2',
        pageName: 'Page 2',
        tag: ['tag3', 'tag4']
      }
    ])
  })

  // Test case 2 - empty array
  it('should return an empty array when there are no results', async () => {
    const result = await getUrl()
    expect(result).toEqual([]) // Expect an empty array
  })
})
