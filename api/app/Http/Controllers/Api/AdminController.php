<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\PostResource;
use App\Http\Resources\Api\UserResource;

class AdminController extends Controller
{
    /**
     * getAllUsers
     *
     * @param  mixed $request
     * @return void
     */
    public function getAllUsers(Request $request)
    {
        $users = User::where('type', User::TYPE_USER)
            ->get();

        return response()->json([
            'message' => 'Users Fetched',
            'data' => UserResource::collection($users),
        ]);
    }

    /**
     * banUser
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function banUser(Request $request,$id)
    {
        $user = User::findOrFail($id);
        $user->banned = true;
        $user->save();
        return response()->json([
            'message' => 'User Banned',
        ]);
    }

    /**
     * unbanUser
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function unbanUser(Request $request,$id)
    {
        $user = User::findOrFail($id);
        $user->banned = false;
        $user->save();
        return response()->json([
            'message' => 'User Un-Banned',
        ]);
    }

    /**
     * getAllPosts
     *
     * @param  mixed $request
     * @return void
     */
    public function getAllPosts(Request $request)
    {
        $posts = Post::with('likedByUsers','comments')
                    ->latest()->get();

        return response()->json([
            'message' => 'Posts Fetched',
            'data' => PostResource::collection($posts),
        ]);
    }

    /**
     * removePost
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function removePost(Request $request,$id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json([
            'message' => 'Post Removed',
        ]);
    }

    /**
     * removeComment
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function removeComment(Request $request,$id)
    {
        DB::table('post_user_comment')->where('id', $id)->delete();

        return response()->json([
            'message' => 'Comment Removed',
        ]);
    }
}
