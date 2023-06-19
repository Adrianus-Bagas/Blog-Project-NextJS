import { useQuery } from "@tanstack/react-query"
import { getPostComment } from "./fetcher"

export const useGetPostComment = (id: number) => {
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ['post-comment', id],
        queryFn: () => getPostComment(id),
        retry: 2
    })

    return { data, isLoading, error, isFetching }
}