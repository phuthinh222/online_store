<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function countAll() {
        $product = Product::all()->count();
        $category = Category::all()->count();
        $user = User::where('role_as' , 0) ->count();
        $order = Order::all()->count();
        return response()->json([
            'status' => 200,
            'count' => [
                'product' => $product,
                'category'=>$category,
                'user' => $user,
                'order' => $order
            ]
            ]);
    }
}
