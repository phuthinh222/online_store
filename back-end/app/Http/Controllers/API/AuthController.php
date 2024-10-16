<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ],
        [
            'name.required' => "Vui lòng nhập họ tên",
            'email.required' => "Vui lòng nhập địa chỉ email",
            'email.email' => 'Email không đúng định dạng',
            'email.unique' => 'Email này đã được sử dụng.',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_error' => $validator->messages()
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status' => '200',
                'username'=> $user->name,
                'token' => $token,
                'message' => 'Registered Successfully'
            ]);
        }
    }

    public function login (Request $request) {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required|min:8'
        ],
        [
            'email.required' => 'Vui lòng nhập địa chỉ email',
            'email.email' => 'Email không đúng định dạng',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_error' => $validator->messages()
            ]);
        } else {
            $user = User::where('email', $request->email)->first();
            if(!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message' => 'Địa chỉ email hoặc mật khẩu không đúng'
                ]);
            } else {
                if($user->role_as == 1){
                    $role = 'admin';
                    $token = $user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;
                } else {
                    $role = '';
                    $token = $user->createToken($user->email.'_Token',[''])->plainTextToken;
                }
                return response()->json([
                    'status' => '200',
                    'username'=> $user->name,
                    'token' => $token,
                    'message' => 'Loggin Successfully',
                    'role' => $role
                ]);
            }
        }
    }

    public function logout()
{
    if (auth('sanctum')->check()) {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logout successfully',
        ]);
    } else {
        return response()->json([
            'status' => 401,
            'message' => 'Vui lòng đăng nhập để tiếp tục',
        ], 401);
    }
}

}
