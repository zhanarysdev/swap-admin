import { fetcher } from '@/fetcher';
import useSWR from 'swr';



export const useProfile = () => {
    const { data, error, isLoading, mutate } = useSWR(
        { url: 'business/v1/profile', custom: true },
        fetcher,
        {
            revalidateOnFocus: true, // Revalidate when window gets focused
            revalidateOnReconnect: true, // Revalidate when browser regains network connection
            dedupingInterval: 5000, // Dedupe requests within 5 seconds
            shouldRetryOnError: true, // Retry on error
        }
    );

    return {
        profile: data?.result || null,
        isLoading,
        isError: error || null,
        mutate,
    };
};

export default useProfile;
