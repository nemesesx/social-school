<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Api\UserResource;
use App\Http\Requests\Api\UserProfileRequest;
use App\Http\Requests\Api\UserRegisterRequest;

class AuthController extends Controller
{
    /**
     * register
     *
     * UserRegisterRequest Class for Request Validation
     * @param  UserRegisterRequest $request
     * @return JsonResponse
     */
    public function register(UserRegisterRequest $request): JsonResponse
    {
        $data = $request->all();
        $data['password'] = bcrypt($request->password);
        $user = User::create($data);
        $user->refresh();

        // Generate User Bearer token for Future Authentications.
        $token = $user->createToken('authToken')->plainTextToken;

        //Return JSON response
        return response()->json([
            'message' => 'User Registered Successfully',
            'data' => UserResource::make($user), // Using Api Resource to filter Out properties that should be sent in response.
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * login
     *
     * @param  mixed $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        //Inline Validation As Payload was small
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            //Return JSON response
            return response()->json([
                'message' => 'Logged in successfully',
                'data' => UserResource::make($user),
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        }

        //Return Error if Credentials Don't Match
        return response()->json([
            'message' => 'Credentials Mismatch',
        ], 401);
    }

    /**
     * logout
     *
     * Delete Current Token to Invalidate it
     * @param  mixed $request
     * @return void
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        //Return JSON response
        return response()->json([
            'message' => 'logged out',
        ]);
    }

    /**
     * profileUpdate
     *
     * @param  mixed $request
     * @return void
     */
    public function profileUpdate(UserProfileRequest $request)
    {
        $data = $request->all();
        $user = $request->user();

        // Update User Picture If It's Present in Request Payload
        if ($request->hasFile('picture')) {
            $imageFile = $request->file('picture');
            $filename = uniqid() . '.' . $imageFile->getClientOriginalExtension(); //generate unique name for picture
            $path = $imageFile->storeAs('public/user/images', $filename); //store file with generated unique name
            $path = Storage::url($path);//get publicly accessible storage path for image
            $data['picture'] = $path;
        }
        $user->update( $data );
        $user->refresh();

        return response()->json([
            'message' => 'Profile Updated',
            'data' => UserResource::make($user),
        ]);
    }

    public function getUserProfile(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'message' => 'Profile Fetched',
            'data' => UserResource::make($user->load('follows','followers')),
        ]);
    }
}
