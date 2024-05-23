<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Api\PostResource;

class PostController extends Controller
{
    /**
     * create Post
     *
     * @param  mixed $request
     * @return void
     */
    public function create(Request $request)
    {
        $data = $request->all();
        $user = $request->user();
        $data['user_id'] =  $user->id;
        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $filename = uniqid() . '.' . $imageFile->getClientOriginalExtension();
            $path = $imageFile->storeAs('public/post/images', $filename);
            $path = Storage::url($path);
            $data['image'] = $path;
        }
        $post = Post::create( $data );
        $post->refresh();

        return response()->json([
            'message' => 'Post Created',
            'data' => PostResource::make($post),
        ]);
    }

    /**
     * update Post
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function update(PostRequest $request,$id)
    {
        $post = Post::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $filename = uniqid() . '.' . $imageFile->getClientOriginalExtension();
            $path = $imageFile->storeAs('public/post/images', $filename);
            $path = Storage::url($path);
            $data['image'] = $path;
        }
        $post->update( $data );

        return response()->json([
            'message' => 'Post Updated',
            'data' => PostResource::make($post),
        ]);
    }

    /**
     * newsFeedPosts
     *
     * Get Posts to show on Newsfeed of Authenticated User
     *
     * @param  mixed $request
     * @return void
     */
    public function newsFeedPosts(Request $request)
    {
        $user = auth()->user();

        //Get Posts of all Users that authenticated User had followed
        $posts = Post::whereIn('user_id', $user->follows()->pluck('users.id'))
                        ->with('likedByUsers','comments')
                        ->latest()->get();
        return response()->json([
            'message' => 'Posts Fetched',
            'data' => PostResource::collection($posts),
        ]);
    }

    /**
     * getAuthenticatedUserPosts
     *
     * Get Authenticated User Own Posts
     *
     * @param  mixed $request
     * @return void
     */
    public function getAuthenticatedUserPosts(Request $request)
    {
        $posts = auth()->user()
                    ->posts()
                    ->with('likedByUsers','comments')
                    ->latest()->get();

        return response()->json([
            'message' => 'Posts Fetched',
            'data' => PostResource::collection($posts),
        ]);
    }

    /**
     * likePost
     *
     * @param  mixed $id
     * @return void
     */
    public function likePost($id)
    {
        $user = auth()->user(); // The authenticated user
        $post = Post::findOrFail($id); // The post to like

        $user->likedPosts()->syncWithoutDetaching($post->id);

        return response()->json(['message' => 'Post liked successfully.']);
    }

    /**
     * unlikePost
     *
     * @param  mixed $id
     * @return void
     */
    public function unlikePost($id)
    {
        $user = auth()->user(); // The authenticated user
        $post = Post::findOrFail($id); // The post to unlike

        $user->likedPosts()->detach($post->id);

        return response()->json(['message' => 'Post unliked successfully.']);
    }

    /**
     * addComment
     *
     * Add a comment to a post.
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function addComment(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        $user = auth()->user(); // The authenticated user
        $post = Post::findOrFail($id); // The post to comment on

        $user->commentedPosts()->attach($post->id, ['comment' => $request->comment]);

        return response()->json(['message' => 'Comment added successfully.']);
    }

    /**
     * removeComment
     *
     * Remove a comment from a post.
     *
     * @param  mixed $id
     * @return void
     */
    public function removeComment($id)
    {
        DB::table('post_user_comment')->where('id', $id)->delete();

        return response()->json(['message' => 'Comment removed successfully.']);
    }


}
