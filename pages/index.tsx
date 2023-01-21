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
        <div className="mt-10 group relative mx-auto w-full overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <h2 className="text-white ml-10 font-semibold">FILTER</h2>
            <div className="flex relative rounded-[15px] bg-white p-6 w-full">
                <div className="mr-10 ">
                    <p className="mb-2 ml-5">Release type</p>
                    <select name="type" className="rounded-[15px] text-md bg-gray-100 p-2" id="type" onChange={filterByType}>
                      <option value="all">All</option>
                      <option value="Security update">Security update</option>
                      <option value="New feature">New Feature</option>
                    </select>
                </div>
                <div className="mr-10 ">
                    <p className="mb-2 ml-5">Product type</p>
                    <select name="type" className="rounded-[15px] text-md bg-gray-100 p-2" id="type" onChange={filterByProduct}>
                      <option value="all">All</option>
                      <option value="pmd">Pmd</option>
                      <option value="composer_lsp">Composer Lsp</option>
                    </select>
                </div>
            </div>
        </div>

        {releaseNotes?.length ? (
          releaseNotes.map((node) => (
              <div className="mt-10 group relative mx-auto w-full overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="relative rounded-[15px] bg-white p-6">
                  <div className="space-y-4">
                    <img src={node?.image?.url} alt={node.title} width={700} height={200} />
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
          <p className="py-4">No release notes found. Try updating your query.</p>
        )}
      </div>
    </Layout>
  )

  function filterByType(event) {
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

  function filterByProduct(event) {
    let product = event.target.value;
    
    if (product == "all") {
        setReleaseNotes(initialData);
        return;
    }

    let filtered_nodes = nodes.filter(function(item){ 
        return item.product == product;
    });

    setReleaseNotes(filtered_nodes);
  }
}

export async function getServerSideProps() {
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
