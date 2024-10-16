<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Thời trang nam',
                'description' => 'Áo polo, áo thun, áo sơ mi, quần dài, quần shorts, trang sức và nước hoa tạo nên một sự đa dạng cho phong cách riêng mỗi người',
            ],
            [
                'name' => 'Thời trang nữ',
                'description' => 'Váy suông, vest, áo sơ mi, chân váy ôm… cùng đa dạng chất liệu với xu hướng trẻ trung',
            ],
            [
                'name' => 'Giày sneaker nam',
                'description' => 'Mẫu giày nam được thiết kế theo phong cách thể thao với phần đế cao su, phần trên là vải chống thấm hút mồ hôi.'
            ],
            [
                'name' => 'Túi xách nữ',
                'description' => 'Với sự đa dạng về kiểu dáng, chất liệu và màu sắc, túi xách nữ đáp ứng mọi nhu cầu và dịp khác nhau.'
            ],
            [
                'name' => 'Mỹ phẩm nam',
                'description' => 'Cung cấp các sản phẩm như sữa rửa mặt, kem chống nắng, lăn khử mùi, sữa tắm'
            ]
        ]);
    }
}
