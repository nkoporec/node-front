import Image from "next/image"

import { formatDate } from "lib/utils"
import { ReleaseNote } from "types"

interface NodeReleaseNoteTeaserProps {
  node: Partial<ReleaseNote>
}

export function NodeReleaseNoteTeaser({ node, ...props }: NodeReleaseNoteTeaserProps) {
  return (
    <article {...props}>
      <div className="group relative mx-auto w-full overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
        <div className="relative rounded-[15px] bg-white p-6">
          <div className="space-y-4">
            // <Image src={node?.image?.url} alt={node.title} width={500} height={500} />
            // <p className="text-lg font-semibold text-slate-800">{node.title}</p>
            // <p className="text-xs text-slate-800"> <span className="font-semibold">{formatDate(node.releaseDate)}</span></p>
            // <p className="text-xs text-slate-800">Type: <span className="font-semibold">{node.releaseType}</span></p>
            // <p className="text-xs text-slate-800">Version: <span className="font-semibold">{node.version}</span></p>
            // <p className="font-md text-slate-500" dangerouslySetInnerHTML={{ __html: node.text.processed }}></p>
          </div>
        </div>
      </div>
    </article>
  )
}
