import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commentService } from '../services/commentsApiService';
import { Weapon } from '../models/weapons';
import { Comment } from '../models/comment';
import { weaponAPIService } from '../services/weaponApiCalls';

const queryClient = useQueryClient();

export const useGetCommentsQuery = (weaponId: string) => useQuery({
  queryKey: ["comments", weaponId],
  queryFn: async () => {
   return await commentService.getComments(weaponId);
  }
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

export const useEditComments = () => {
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
  }
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