<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class APIAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check()){
            if(auth()->user()->tokenCan('server:admin')) {
                return $next($request);

            } else {
                return response()->json([
                    'message' => 'Ban khong the truy cap'
                ],403);
            }
        } else{
            return response()->json([
                'status' => 401,
                'message' => 'Vui long dang nhap'
            ]);
        }
    }
}
