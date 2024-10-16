<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'fullname','address','phone','status'
    ];
    public function orderItems(){
        return $this->hasMany(OrderItems::class, 'order_id','id');
    }
}
