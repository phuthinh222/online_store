<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index() {
        $user = User::where('role_as',0)->get();
        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ],
        [
            'name.required' => 'Vui lòng nhập họ tên',
            'email.required' => 'Vui lòng nhập địa chỉ email',
            'email.email' => 'Định dạng email không đúng',
            'email.unique' => 'Địa chỉ email đã tồn tại trong hệ thống',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu phải 8 kí tự trở lên'
        ]);
        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        }
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role_as = 0;
        $user->save();
        return response()->json([
            'status' => 200,
            'message' => 'Thêm mới tài khoản thành công'
        ]);
    }

    public function destroy($id) {
        $user = User::where('role_as',0)->find($id);
        if($user) {
            $user->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Xoá tài khoản người dùng thành công   '
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy người dùng'
            ]);
        }
    }
}
