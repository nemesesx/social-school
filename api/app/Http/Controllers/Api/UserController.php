<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\UserResource;

class UserController extends Controller
{
    /**
     * searchUsers
     *
     * @param  mixed $request
     * @param  mixed $keyword
     * @return void
     */
    public function searchUsers(Request $request, $keyword)
    {
        $users = User::where(function ($q) use ($keyword) {
            $q->where('name', 'like', '%' . $keyword . '%')
                ->orWhere('email', 'like', '%' . $keyword . '%');
        })
            ->where('type', User::TYPE_USER)
            ->get();

        return response()->json([
            'message' => 'Users Fetched',
            'data' => UserResource::collection($users),
        ]);
    }

    /**
     * getUser
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function getUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'message' => 'User Fetched',
            'data' => UserResource::make($user->load('posts')),
        ]);
    }

    /**
     * getSuggestedUser
     *
     * Return suggested user (follows of authenticated user follows)
     *
     * @param  mixed $request
     * @return void
     */
    public function getSuggestedUser(Request $request)
    {
        $user = $request->user();

        // Get the IDs of users the authenticated user follows
        $followedUserIds = $user->follows()->pluck('users.id');

        // Get the follows of the users the authenticated user follows
        $suggestedUserIds = User::whereIn('id', $followedUserIds)
            ->with('follows')
            ->get()
            ->pluck('follows.*.id')
            ->flatten()
            ->unique()
            ->diff([$user->id, ...$followedUserIds])
            ->shuffle()
            ->take(5);

        // Fetch the suggested users
        $suggestedUsers = User::whereIn('id', $suggestedUserIds)->get();

        return response()->json([
            'message' => 'Suggested Users Fetched',
            'data' => UserResource::collection($suggestedUsers),
        ]);
    }

    /**
     * followUser
     *
     * @param  mixed $id
     * @return void
     */
    public function followUser($id)
    {
        $user = auth()->user(); // The authenticated user
        $anotherUser = User::findOrFail($id); // The user to follow

        $user->follows()->syncWithoutDetaching($anotherUser->id);

        return response()->json(['message' => 'User followed successfully.']);
    }

    /**
     * unfollowUser
     *
     * @param  mixed $id
     * @return void
     */
    public function unfollowUser($id)
    {
        $user = auth()->user(); // The authenticated user
        $anotherUser = User::findOrFail($id); // The user to unfollow

        $user->follows()->detach($anotherUser->id);

        return response()->json(['message' => 'User unfollowed successfully.']);
    }
}
