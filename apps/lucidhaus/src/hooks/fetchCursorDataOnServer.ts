import { ZodSchema, z } from 'zod'

type UseCursorFetchOptions<TData> = {
  endpoints: string[]
  schema: ZodSchema<TData>
}

type CursorResponse<TData> = {
  data: TData[]
  limit: number
  has_more: boolean
  cursor: {
    first: any
    last: any
  }
  total: number
}

type CursorFetchResult<TData> = {
  data: TData[]
  total: number
  error: string | null
}

export async function fetchCursorDataOnServer<TData>({
  endpoints,
  schema,
}: UseCursorFetchOptions<TData>): Promise<CursorFetchResult<TData>> {
  const responseSchema = z.object({
    data: z.array(schema),
    limit: z.number(),
    has_more: z.boolean(),
    cursor: z.object({
      first: z.string().nullable(),
      last: z.string().nullable(),
    }),
    total: z.number(),
  })

  const fetcher = async (url: string): Promise<CursorResponse<TData>> => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      const jsonData = await response.json()
      return responseSchema.parse(jsonData)
    } catch (error) {
      console.error(`Failed to fetch data from endpoint ${url}`, error)
      throw error
    }
  }

  try {
    const fetchPromises = endpoints.map(fetcher)
    const responses = await Promise.all(fetchPromises)

    let combinedData: TData[] = ([] as TData[]).concat(...responses.map((r) => r.data))
    const sumTotal = responses.reduce((acc, obj) => acc + obj.total, 0)

    return {
      data: combinedData,
      total: sumTotal,
      error: null,
    }
  } catch (error: any) {
    return {
      data: [],
      total: 0,
      error: error?.message || 'An error occurred during data fetching.',
    }
  }
}
