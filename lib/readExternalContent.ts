import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = 'e0279db6b37943308048d1a36b6aa66d';
  const response = await notion.databases.query({
    database_id: databaseId
  });
  console.log(response);
})();


export async function readExternalContent() {
    try {
      // Adjust the path to your Markdown file
      const response = await fetch('https://raw.githubusercontent.com/SchoolOfCode/bc16-final-projects-team-large-language-mavericks/main/lib/resources.md'); // Adjust the path to your Markdown file
      if (!response.ok) {
        throw new Error('Failed to fetch Markdown content');
      }
      const markdownText = await response.text();
      return markdownText;
    } catch (error) {
      console.error('Error reading Markdown content:', error);
      return '';
    }
  }