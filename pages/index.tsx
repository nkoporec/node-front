import Head from "next/head"

import { query } from "lib/drupal"
import { formatDate } from "lib/utils"
import { Layout } from "components/layout"
import { ReleaseNote } from "types"
import { useState } from 'react';


interface IndexPageProps {
  nodes: ReleaseNote[]
}

export default function IndexPage({ nodes }: IndexPageProps) {
  const initialData = nodes;
  const [releaseNotes, setReleaseNotes] = useState(nodes)

  return (
    <Layout>
      <Head>
        <title>Node | Release notes</title>
        <meta
          name="description"
          content="Release notes"
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest release notes.</h1>
        <div className="flex">
            <div className="block mr-10">
                <p>Release type</p>
                <select name="type" id="type" onChange={handleTypeChange}>
                  <option value="all" selected>All</option>
                  <option value="Security update">Security update</option>
                  <option value="New feature">New Feature</option>
                </select>
            </div>
            <div className="block">
                <p>Product</p>
                <select name="type" id="type">
                  <option value="all" selected>All</option>
                  <option value="pmd">PMD</option>
                  <option value="composer_lsp">Composer lsp</option>
                </select>
            </div>
        </div>

        {releaseNotes?.length ? (
          releaseNotes.map((node) => (
              <div className="mt-10 group relative mx-auto w-full overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
                <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
                <div className="relative rounded-[15px] bg-white p-6">
                  <div className="space-y-4">
                    <img src={node?.image?.url} alt={node.title} width={500} height={500} />
                    <p className="text-lg font-semibold text-slate-800">{node.title}</p>
                    <p className="text-xs text-slate-800"> <span className="font-semibold">{formatDate(node.releaseDate)}</span></p>
                    <p className="text-xs text-slate-800">Type: <span className="font-semibold">{node.releaseType}</span></p>
                    <p className="text-xs text-slate-800">Version: <span className="font-semibold">{node.version}</span></p>
                    <p className="text-xs text-slate-800">Product: <span className="font-semibold">Product: {node.product}</span></p>
                    <div className="font-md text-slate-500" dangerouslySetInnerHTML={{ __html: node.text.processed }}></div>
                  </div>
                </div>
              </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </Layout>
  )

  function handleTypeChange(event) {
    let type = event.target.value;
    
    if (type == "all") {
        setReleaseNotes(initialData);
        return;
    }

    let filtered_nodes = nodes.filter(function(item){ 
        return item.releaseType == type;
    });

    setReleaseNotes(filtered_nodes);
  }
}

export async function getServerSideProps() {
  // Fetch the first 10 articles.
  const data = await query<{
    nodeReleaseNots: {
      nodes: ReleaseNote[]
    }
  }>({
    query: `
      query {
          nodeReleaseNots(first: 10) {
            nodes {
              id
              version
              changed
              created
              author {
               displayName
              }
              path
              promote
              releaseDate
              releaseType
              title
              product
              text {
                format
                value
                processed
              }
              image {
                url
                width
                height
              }
            }
        }
      }
    `,
  })

  return {
    props: {
      nodes: data?.nodeReleaseNots?.nodes ?? [],
    },
  }
}
