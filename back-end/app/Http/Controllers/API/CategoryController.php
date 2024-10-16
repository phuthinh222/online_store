<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    public function index(){
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category'=>$category
        ]);
    }

    public function store (Request $request) {

        $validator = Validator::make($request->all(),[
            'description' => 'required|max:191',
            'name' => 'required|max:191'
        ],
        [
            'description.required' => 'Vui lòng nhập mô tả loại hàng',
            'description.max' => 'Vượt quá số kí tự tối đa',
            'name.required' => 'Vui lòng nhập tên loại hàng',
            'name.max' => 'Vượt quá số kí tự tối đa',
        ]);
        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        }
        $category = new Category;
        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();
        return response()->json([
            'status' => 200,
            'message' => 'Add Category Successfully'
        ]);
    }

    public function edit($id) {
        $category = Category::find($id);
        if($category) {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No find category'
            ]);
        }
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'description' => 'required|max:191',
            'name' => 'required|max:191'
        ],
        [
            'description.required' => 'Vui lòng nhập mô tả loại hàng',
            'description.max' => 'Vượt quá số kí tự tối đa',
            'name.required' => 'Vui lòng nhập tên loại hàng',
            'name.max' => 'Vượt quá số kí tự tối đa',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }
        $category = Category::find($id);
        if($category) {
            $category->name = $request->name;
            $category->description = $request->description;
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Update Category Successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found'
            ]);
        }
    }

    public function destroy($id) {
        $category = Category::find($id);
        if($category) {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Delete category successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found'
            ]);
        }
    }
    public function allCategory(){
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category'=>$category
        ]);
    }
}
