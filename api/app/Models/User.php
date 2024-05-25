<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Post;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /** USER TYPES */
    public const TYPE_ADMIN = 'ADMIN';
    public const TYPE_USER = 'USER';


    /** ALL USER TYPES */
    public const ALL_USER_TYPES = [
        self::TYPE_ADMIN,
        self::TYPE_USER,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'type',
        'picture',
        'bio',
        'banned'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];



    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */


    /**
     * posts
     *
     * @return HasMany
     */
    public function posts(): HasMany
    {
        return $this->hasMany(
            Post::class,
            'user_id',
            'id',
        );
    }

    /**
     * follows
     *
     * The users that this user follows.
     *
     * @return BelongsToMany
     */
    public function follows(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'user_follower',
            'user_id',
            'follower_id'
        )->withTimestamps();
    }

    /**
     * followers
     *
     * The users that follow this user.
     *
     * @return BelongsToMany
     */
    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'user_follower',
            'follower_id',
            'user_id'
        )->withTimestamps();
    }

    /**
     * likedPosts
     *
     * The posts that the user has liked.
     *
     * @return BelongsToMany
     */
    public function likedPosts(): BelongsToMany
    {
        return $this->belongsToMany(
            Post::class,
            'post_user_like',
            'user_id',
            'post_id'
        )->withTimestamps();
    }

    /**
     * commentedPosts
     *
     * The posts that the user has commented on.
     *
     * @return BelongsToMany
     */
    public function commentedPosts(): BelongsToMany
    {
        return $this->belongsToMany(
            Post::class,
            'post_user_comment'
        )->withPivot('comment','id')
            ->withTimestamps();
    }
}
