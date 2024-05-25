<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Auth Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Group routes that only authenticated user can access with sanctum middleware.
Route::middleware('auth:sanctum')->group(function () {

    //logout Route
    Route::get('/logout', [AuthController::class, 'logout']);

    //profile Routes
    Route::post('update/profile',[AuthController::class,'profileUpdate']);
    Route::get('get/profile',[AuthController::class,'getUserProfile']);

    //Post Routes
    Route::post('post/create',[PostController::class,'create']);
    Route::post('post/update/id={id}',[PostController::class,'update']);
    Route::get('post/newsfeed',[PostController::class,'newsFeedPosts']);
    Route::get('post/self',[PostController::class,'getAuthenticatedUserPosts']);
    Route::get('/post/like/id={id}', [PostController::class, 'likePost']);
    Route::get('/post/unlike/id={id}', [PostController::class, 'unlikePost']);
    Route::post('/post/comment/id={id}', [PostController::class, 'addComment']);
    Route::delete('/post/comment/id={id}', [PostController::class, 'removeComment']);


    //User Routes
    Route::get('search/users/keyword={keyword}',[UserController::class,'searchUsers']);
    Route::get('get/user/id={id}',[UserController::class,'getUser']);
    Route::get('get/user/suggested',[UserController::class,'getSuggestedUser']);

    //follow Routes
    Route::get('/follow/user/id={id}', [UserController::class, 'followUser']);
    Route::get('/unfollow/user/id={id}', [UserController::class, 'unfollowUser']);

    //Admin Routes
    Route::middleware(['is.admin'])
    ->group(function () {

        //User Routes
        Route::get('admin/users',[AdminController::class,'getAllUsers']);
        Route::put('admin/user/ban/id={id}',[AdminController::class,'banUser']);
        Route::put('admin/user/unban/id={id}',[AdminController::class,'unbanUser']);

        //Post Routes
        Route::get('admin/posts',[AdminController::class,'getAllPosts']);
        Route::delete('admin/post/remove/id={id}',[AdminController::class,'removePost']);
        Route::delete('admin/comment/remove/id={id}',[AdminController::class,'removeComment']);
    });
});
