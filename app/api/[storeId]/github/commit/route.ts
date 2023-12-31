import { NextResponse } from "next/server";
import { createKoreFile, createGitHubAdaptor } from "korefile";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {

  const body = await req.json();
  const { repoName, customStore } = body;

  const {
    header_main,
    header_contrast,
    header_secondary,
    container_main,
    container_contrast,
    container_secondary
  } = customStore;

  const koreFile = createKoreFile({
    adaptor: createGitHubAdaptor({
      owner: "Linh25qb12",
      repo: repoName,
      ref: "heads/main",
      token: process.env.GITHUB_BEARER_KEY
    })
  });

  const testFilePath = "app/globals.scss";

  const input = `@tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    html,
    body,
    :root {
      height: 100%;
      --header-primary-color: ${header_main};
      --header-contrast-color: ${header_contrast};
      --header-secondary-color: ${header_secondary};
      --container-primary-color: ${container_main};
      --container-contrast-color: ${container_contrast};
      --container-secondary-color: ${container_secondary};
    }
    
    .custom-header,
    .custom-footer {
      background-color: var(--header-primary-color) !important;
      color: var(--header-contrast-color);
    
      .text-white {
        color: var(--header-primary-color);
      }
    
      .text-black {
        color: var(--header-contrast-color);
      }
    
      .text-black:hover {
        color: var(--header-secondary-color);
      }
    
      .bg-black {
        background-color: var(--header-contrast-color);
      }
    
      .text-neutral-500 {
        color: var(--header-contrast-color);
      }
    
    }
    
    .custom-container {
      background-color: var(--container-primary-color);
    
      .bg-white {
        background-color: var(--container-secondary-color);
      }
    
      .bg-black {
        background-color: var(--container-contrast-color);
      }
    
      .text-white {
        color: var(--container-primary-color);
      }
    
      color: var(--container-contrast-color) !important;
    
      .text-gray-800 {
        color: var(--container-contrast-color) !important;
      }
    
      .text-gray-500 {
        color: var(--container-contrast-color) !important;
      }
    
      .bg-neutral-200 {
        background-color: var(--container-secondary-color);
      }
    
      .bg-gray-50 {
        background-color: var(--container-secondary-color);
      }
    
      .text-gray-900 {
        color: var(--container-contrast-color) !important;
      }
    
      .text-black {
        color: var(--container-contrast-color);
      }
    }`
  await koreFile.writeFile(testFilePath, input);

  return NextResponse.json('Commit success', { status: 200 });
};