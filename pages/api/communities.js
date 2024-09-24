import { SiteClient } from 'datocms-client'

export default async function createCommunity(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.FULL_ACCESS_API_TOKEN

    const client = new SiteClient(TOKEN)

    const { title, imageUrl, creatorSlug } = request.body

    const createdRecord = await client.items.create({
      itemType: 'W5shpm1VRS6OeVq8yTwX_g',
      title,
      imageUrl,
      creatorSlug
    })

    return response.json({ createdRecord })
  }

  if (request.method === 'GET') {
    const apiResponse = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        Authorization: process.env.READONLY_API_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`
      })
    })

    const JSONResponse = await apiResponse.json()

    const communities = JSONResponse.data.allCommunities

    return response.json(communities)
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  })
}
