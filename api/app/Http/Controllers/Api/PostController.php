<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Api\PostResource;

class PostController extends Controller
{
    public function create(PostRequest $request)
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
}
