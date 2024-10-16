<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function order(Request $request){
        if(auth('sanctum')->check()) {
            $validator = Validator::make($request->all(),[
                'fullname' => 'required|max:191',
                'address'=> 'required|max:191',
                'phone' => 'required|max: 11'
            ]);
            if($validator->fails()){
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages()
                ]);
            } else {
                $user_id = auth('sanctum')->user()->id;
                $order = new Order;
                $order->user_id = $user_id;
                $order->fullname = $request->fullname;
                $order->address = $request->address;
                $order->phone = $request->phone;
                $order->save();

                $cart = Cart::with('product')->where('user_id', $user_id)->get();
                $orderItems = [];
                foreach($cart as $item){
                    $orderItems[] = [
                        'product_id' => $item->product_id,
                        'quantity' => $item->product_quantity,
                        'price' => $item->product->selling_price
                    ];
                    $item->product->update([
                        'quantity' => $item->product->quantity - $item->product_quantity
                    ]);
                }

                $order->orderItems()->createMany($orderItems);
                Cart::destroy($cart);

                return response()->json([
                    'status' => 200,
                    'message' => 'Đặt hàng thành công'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập để mua sắm'
            ]);
        }
    }
}
