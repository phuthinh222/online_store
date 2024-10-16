<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontEndController extends Controller
{
    public function category() {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }
    public function product(Request $request) {
        $categoryId = $request->query('category');
        if ($categoryId === "null") {
            $products = Product::with('category')->get();
        } else {
            $products = Product::where('category_id', $categoryId)->with('category')->get();
        }
            return response()->json([
                'status' => 200,
                'product_data' => [
                    'product' => $products,
                ],
                'category' => $categoryId
                ]);
    }

    public function productDetail($id) {
        $product = Product::with('category')->find($id);
        if($product) {
            return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found'
            ]);
        }
    }

    public function topProduct() {
        $products = Product::take(3)->get();
        return response()->json([
            'status' => 200,
            'product' => $products
        ]);
    }
}
