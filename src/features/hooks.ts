import { QueryCache, QueryClient, useMutation, useQuery} from '@tanstack/react-query';
import { commentService } from '../services/commentsApiService';
import { Weapon } from '../models/weapons';
import { Comment } from '../models/comment';
import { weaponAPIService } from '../services/weaponApiCalls';
import toast from 'react-hot-toast';


export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) =>{
            toast.error('Something went wrong:'+ {error})
        }
    })
})


export const useGetCommentsQuery = (weaponId: string) => useQuery({
  queryKey: ["comments", weaponId],
  queryFn: async () => {
   return await commentService.getComments(weaponId);
  },
  refetchInterval: 30000,
  useErrorBoundary: true,
    
});


export const useAddComments = () => {
    return useMutation({
        mutationFn: async (newComment: Comment) => {
            return await commentService.addComment(newComment)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"])
        }
    })
}

export const useEditComments = (weaponId: string) => {
    return useMutation({
        mutationFn: async (newComment: Comment) => {
            return await commentService.updateComment(newComment)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", weaponId])
        }
    })
}

export const useDeleteComments = () => {
    return useMutation({
        mutationFn: async (newComment: Comment) => {
            return await commentService.deleteComment(newComment)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"])
        }
    })
}


export const useGetWeaponsQuery = () => useQuery({
  queryKey: ["weapons"],
  queryFn: async () => {
   return await weaponAPIService.getWeapons();
  },
  refetchInterval: 30000,
});

export const useAddWeapon = () => {
    return useMutation({
        mutationFn: async (newWeapon: Weapon) => {
            return await weaponAPIService.addWeapon(newWeapon)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["weapons"])
        }
    })
}

export const useEditWeapon = () => {
    
    return useMutation({
        mutationFn: async (newWeapon: Weapon) => {
            return await weaponAPIService.updateWeapon(newWeapon)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["weapons"])
        }
    })

}

export const useDeleteWeapon = () => {
    return useMutation({
        mutationFn: async (newWeapon: Weapon) => {
            return await weaponAPIService.deleteWeapon(newWeapon)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["weapons"])
        }
    })
}