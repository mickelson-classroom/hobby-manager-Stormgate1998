import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../services/commentsApiService';
import { Weapon } from '../models/weapons';
import { Comment } from '../models/comment';
import { weaponAPIService } from '../services/weaponApiCalls';



export const useGetCommentsQuery = (weaponId: string) => useQuery({
  queryKey: ["comments", weaponId],
  queryFn: async () => {
   return await commentService.getComments(weaponId);
  },
  refetchInterval: 30000,
});


export const useAddComments = (weaponId: string) => {
    const queryClient = useQueryClient();
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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newComment: Comment) => {
            return await commentService.updateComment(newComment)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"])
        }
    })
}

export const useDeleteComments = () => {
    const queryClient = useQueryClient();
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
    const queryClient = useQueryClient();
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
    const queryClient = useQueryClient();
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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newWeapon: Weapon) => {
            return await weaponAPIService.deleteWeapon(newWeapon)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["weapons"])
        }
    })
}