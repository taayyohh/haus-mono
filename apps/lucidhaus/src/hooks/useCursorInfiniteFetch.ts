import { ZodSchema, z } from 'zod'
import useSWR from 'swr'

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

export function useCursorFetch<TData>({
  endpoints,
  schema,
}: UseCursorFetchOptions<TData>) {
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

  const fetcher = async (urls: string[]): Promise<CursorResponse<TData>[]> => {
    const requests = urls.map(async (url) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      const jsonData = await response.json()
      return responseSchema.parse(jsonData)
    })

    return Promise.all(requests)
  }

  const {
    data: responses,
    error,
    isValidating,
    mutate,
  } = useSWR<CursorResponse<TData>[]>(endpoints, fetcher, { revalidateOnFocus: false })

  let combinedData: TData[] = []
  if (responses) {
    combinedData = ([] as TData[]).concat(...responses.map((r) => r.data))
  }

  const sumTotal = responses?.reduce((acc, obj) => acc + obj.total, 0)

  return {
    data: combinedData,
    total: sumTotal,
    error,
    isValidating,
    mutate,
  }
}
