import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ 
  notionClient: notion
 });

function isPageObjectResponse(response: any): response is PageObjectResponse {
  return response.object === 'page' && 'properties' in response;
}

 // function to retrieve url, pageName and pageId, filtered by Tag name
export async function getUrl() {
  const databaseId: string = process.env.NOTION_API_DB_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  console.log(response);
  let returnObject: Array<{ url: string, pageId: string, pageName: string, tag: string[] }> = [];

  for (let i = 0; i < response.results.length; i++) {
    const page = response.results[i];
    if (isPageObjectResponse(page)) {
      const properties = page.properties;
      
      const url = properties["URL"]?.type === 'url' ? properties["URL"].url : null;
      const name = properties["Name"]?.type === 'title' && properties["Name"].title.length > 0 ? properties["Name"].title[0].plain_text : null;
      const tags = properties["Tags"]?.type === 'multi_select' ? properties["Tags"].multi_select.map(tag => tag.name) : [];

      if (url && name) {
        returnObject.push({
          "url": url,
          "pageId": page.id,
          "pageName": name,
          "tag": tags
        });
      }
    }
  }

  return returnObject;
}

// read Notion page content and return in md format
export async function readNotionPageContent(pageId: string): Promise<string> {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const markdownText = n2m.toMarkdownString(mdblocks);
    return markdownText.parent;
  } catch (error) {
    console.error('Error fetching and converting Notion content:', error);
    return '';
  }
  }