<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'type' => $this->type,
            'bio' => $this->bio,
            'picture' => empty($this->picture) ? $this->picture : url($this->picture),
            'follows' => UserResource::collection($this->whenLoaded('follows')),
            'followers' => UserResource::collection($this->whenLoaded('followers')),
        ];
    }
}
