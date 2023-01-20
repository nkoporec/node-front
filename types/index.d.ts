export type Image = {
  url: string
  width: number
  height: number
}

export type ReleaseNote = {
  __typename: "NodeReleaseNots"
  title: string
  id: string
  text: {
    processed: string
  }
  releaseDate: string
  releaseType: string
  version: string
  product: string
  image: Image
}
