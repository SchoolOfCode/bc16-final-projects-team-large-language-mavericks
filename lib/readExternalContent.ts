import { Client } from '@notionhq/client';
import {NotionToMarkdown} from 'notion-to-md'

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ 
  notionClient: notion
 });

 // function to retrieve url, pageName and pageId, filtered by Tag name
export async function getUrl (){
  const databaseId = 'e0279db6b37943308048d1a36b6aa66d';
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  console.log(response);
  let returnObject = [];
  for (let i = 0; i < response.results.length; i++) {
    returnObject.push({"url": response.results[i]["properties"]["URL"]['url'], 
    "pageId": response.results[i]["id"], 
    "pageName": response.results[i]["properties"]["Name"]["title"][0]["plain_text"],
    "tag": response.results[i]["properties"]["Tags"]["multi_select"].map((tag) => tag["name"])
  })
  }
  return returnObject
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