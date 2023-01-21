# Node

A Nextjs frontend to be used with a Drupal backend, located at [Node](https://github.com/nkoporec/node)

## How to use

1. Clone the repository
2. Run `npm install`
3. You need to set up authentication client id and secret in Drupal, see docs at [Nextjs-Drupal Authentication](https://next-drupal.org/learn/graphql/configure-authentication)
4. Copy `.env.example` to `.env`
5. Set  `NEXT_PUBLIC_DRUPAL_BASE_URL=http://node.ddev.site`
6. Set  `NEXT_IMAGE_DOMAIN=node.ddev.site`
7. Set  `DRUPAL_CLIENT_ID={CLIENT_ID}`
8. Set  `DRUPAL_CLIENT_SECRET={CLIENT_SECRET}`
9. Run `npm run dev`

## Documentation

See https://next-drupal.org or https://www.chapterthree.com/blog/nextjs-drupal-and-graphql-how-to-use-graphql-next-drupal
