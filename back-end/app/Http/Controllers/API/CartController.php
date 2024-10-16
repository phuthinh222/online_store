<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_quantity = $request->product_quantity;
            $productCheck = Product::where('id', $product_id)->first();
            if($productCheck) {
                if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()){
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name . 'Đã có sẵn trong giỏ hàng'
                    ]);
                } else {
                    $cartItem = new Cart();
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_quantity = $product_quantity;
                    $cartItem->save();
                    return response()->json([
                        'status' => 201,
                        'message' => 'Thêm vào giỏ hàng thành công'
                    ]);
                }
                return response()->json([
                    'status' => 201,
                    'message' => 'Hiện tại đang ở giỏ hàng'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy sản phẩm'
                ]);
            }
            return response()->json([
                'status' => 201,
                'message' => 'Thêm vào giỏ hàng thành công'
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập để mua sắm'
            ]);
        }
    }

    public function viewCart() {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::with('product')->where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cartItem 
            ]);
        }
        else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập để mua sắm'
            ]);
        }
    }

    public function update($card_id, $scope) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::with('product')->where('user_id', $user_id)->where('id', $card_id)->first();
            if($scope == "inc") {
                $cartItem->product_quantity += 1;
            } else if ($scope == 'des' ) {
                $cartItem->product_quantity -= 1;
            }
            $cartItem->update();
            return response()->json([
                'status' => 200,
            ]);
        }
        else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập để mua sắm'
            ]);
        }
    }

    public function delete($card_id) {
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::with('product')->where('user_id', $user_id)->where('id', $card_id)->first();
            if($cartItem) {
                $cartItem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Xoá sản phẩm ra giỏ hàng thành công'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Sản phẩm không tồn tại'
                ]);
            }
        }
        else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập để mua sắm'
            ]);
        }
    }

    public function count(){
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $count = Cart::where('user_id', $user_id)->count();
            return response()->json([
                'status' => 200,
                'count' => $count
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập để mua sắm'
            ]);
        }
    }
}
