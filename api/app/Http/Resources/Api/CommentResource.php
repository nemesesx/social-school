<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->pivot->id,
            'comment' => $this->pivot->comment,
            'created_at' => $this->pivot->created_at->diffForHumans(),
            'commented_by' => new UserResource($this),
        ];
    }
}
