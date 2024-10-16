<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\FrontEndController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

// Authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('count', [CartController::class, 'count']);

// Category
Route::get('getCategory', [FrontEndController::class, 'category']);

// Product
Route::get('product', [FrontEndController::class, 'product']);
Route::get('getProduct/{id}', [FrontEndController::class, 'productDetail']);
Route::get('topProduct', [FrontEndController::class, 'topProduct']);

// Cart
Route::post('addToCart',[CartController::class, 'addToCart']);
Route::get('cart',[CartController::class, 'viewCart']);
Route::put('updateCart/{cart_id}/{scope}',[CartController::class, 'update']);
Route::delete('deleteCart/{cart_id}',[CartController::class, 'delete']);

// Order
Route::post('order',[CheckoutController::class, 'order']);

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function() {

    Route::get('/checkingAuthenticated', function() {
        return response()->json([
            'message' => 'You are logged',
            'status' => 200
        ], 200);
    });

    // User
    Route::get('viewUser', [UserController::class, 'index']);
    Route::post('storeUser', [UserController::class, 'store']);
    Route::delete('deleteUser/{id}', [UserController::class, 'destroy']);

    // Category
    Route::post('storeCategory', [CategoryController::class, 'store']);
    Route::get('viewCategory', [CategoryController::class, 'index']);
    Route::get('allCategory', [CategoryController::class, 'allCategory']);
    Route::get('editCategory/{id}', [CategoryController::class, 'edit']);
    Route::put('updateCategory/{id}', [CategoryController::class, 'update']);
    Route::delete('deleteCategory/{id}', [CategoryController::class, 'destroy']);

    //Product
    Route::post('storeProduct', [ProductController::class, 'store']);
    Route::get('viewProduct', [ProductController::class, 'index']);
    Route::get('editProduct/{id}', [ProductController::class, 'edit']);
    Route::put('updateProduct/{id}', [ProductController::class, 'update']);
    Route::delete('deleteProduct/{id}', [ProductController::class, 'destroy']);

    Route::get('countAll',[AdminController::class, 'countAll']);

    // Order
    Route::get('admin/order', [OrderController::class, 'index']);

});

Route::middleware(['auth:sanctum'])->group(function() {

    Route::post('logout', [AuthController::class, 'logout']);
});

