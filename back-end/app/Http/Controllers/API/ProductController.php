<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(){
        $product = Product::with('category')->get();
        return response()->json([
            'status' => 200,
            'products' => $product
        ]);
    }

    public function store (Request $request) {
        $validator = Validator::make($request->all(),[
            'category_id' => 'required|max:191',
            'name' =>'required|max:191',
            'description' => 'required',
            'brand' => 'required|max:20',
            'selling_price' => 'required|max:20',
            'original_price' => 'required|max:20',
            'quantity' => 'required|max:4',
            'image' => 'required|image|mimes:jpeg,png,jpg',
        ],
            [
                'category_id.required' => 'Vui lòng chọn loại hàng',
                'name.required' => 'Vui lòng nhập tên sản phẩm',
                'name.max' => 'Tên sản phẩm vượt qua số lượng ký tự tối đa',
                'description.required' => 'Vui lòng nhập mô tả sản phẩm',
                'brand.required' => 'Vui lòng nhập thương hiệu sản phẩm',
                'brand.max' => 'Thương hiệu vượt quá số kí tự tối đa',
                'selling_price.required' => 'Vui lòng nhập giá giảm giá của sản phẩm',
                'selling_price.required' => 'Giá giảm giá của sản phẩm vượt quá số kí tự tối đa',
                'original_price.required' => 'Vui lòng nhập giá gốc của sản phẩm',
                'original_price.required' => 'Giá gốc của sản phẩm vượt quá số kí tự tối đa',
                'quantity.required' => 'Vui lòng số lượng sản phẩm',
                'quantity.max' => 'Số lượng sản phẩm vượt quá kí tự tối đa',
                'image.required' => 'Vui lòng chọn ảnh cho sản phẩm',
                'image.image' => 'Hình ảnh sản phẩm phải là 1 hình ảnh !',
                'image.mimes' => ' Hình sảnh sản phẩm phải là định dạng jpeg,png,jpg',
            ]
        );
        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $product = new Product();
            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->brand = $request->input('brand');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->quantity = $request->input('quantity');

            if($request->has('image')){
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time(). '.' . $extension;
                $file->move('uploads/product/',$filename);
                $product->image = 'uploads/product/'.$filename;
            }

            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Add product successfully',
            ]);
        }
    }

    public function edit($id){
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

    public function update (Request $request, $id){
        $validator = Validator::make($request->all(),[
            'category_id' => 'required|max:191',
            'slug' => 'required|max:191',
            'name' =>'required|max:191',
            'meta_title' => 'required|max:191',
            'brand' => 'required|max:20',
            'selling_price' => 'required|max:20',
            'original_price' => 'required|max:20',
            'quantity' => 'required|max:4',
        ]);
        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
                'data' => $request->input('category_id')
            ]);
        } else {
            $product = Product::find($id);
            if($product) {
                $product->category_id = $request->input('category_id');
                $product->slug = $request->input('slug');
                $product->name = $request->input('name');
                $product->description = $request->input('description');
                $product->meta_title = $request->input('meta_title');
                $product->meta_keyword = $request->input('meta_keyword');
                $product->meta_description = $request->input('meta_description');
                $product->brand = $request->input('brand');
                $product->selling_price = $request->input('selling_price');
                $product->original_price = $request->input('original_price');
                $product->quantity = $request->input('quantity');

                if ($request->has('image') && $request->file('image')) {
                    $path = $product->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/product/', $filename);
                    $product->image = 'uploads/product/' . $filename;
                } else {
                    $product->image = $product->image;
                }

                $product->featured = $request->input('featured');
                $product->popular = $request->input('popular');
                $product->status = $request->input('status');

                $product->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Update product successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Not Found'
                ]);
            }

        }
    }
    public function destroy($id){
        $product = Product::find($id);
        if ($product) {
            $path = $product->image;
            if (File::exists($path)) {
                File::delete($path);
            }
            $product->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Xoá sản phầm thành công',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ]);
        }
    }
}
