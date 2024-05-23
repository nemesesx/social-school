<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use App\Http\Resources\Api\UserResource;
use App\Http\Resources\Api\CommentResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'image' => empty($this->image) ? $this->image : url($this->image),
            'created_at' => $this->created_at->diffForHumans(),
            'posted_by' => UserResource::make($this->user),
            'likes' => UserResource::collection($this->whenLoaded('likedByUsers')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
