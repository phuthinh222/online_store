<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'category_id' => 5,
                'name' => 'The Ordinary Granactive Retinoid 2% Emulsion',
                'description' => 'HPR là một dạng Retinoid* có tính tiên tiến cao mà trong thực tế hiệu quả chống lão hoá tốt hơn cả dạng retinol* thông thường. Giải pháp chống lão hóa da hiệu quả, cải thiện làn da, xóa mờ các nếp nhăn giúp da căng bóng hơn.',
                'brand' => 'The Ordinary.',
                'selling_price' => '430000',
                'original_price' => '289000',
                'quantity' => 15,
                'image' => 'uploads/product/image-1.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'category_id' => 4,
                'name' => 'Túi đeo vai phom mềm phối xích',
                'description' => 'Vascara là thương hiệu giày, túi xách thời trang dành cho phái đẹp hàng đầu Việt Nam. Với danh mục sản phẩm đa dạng như giày cao gót, giày sandals, giày boots, giày búp bê, giày bít, túi xách tay, túi đeo chéo, túi tote, ví dự tiệc, ví cầm tay, ví mini, phụ kiện, mắt kính, thắt lưng,... được thiết kế hiện đại, trẻ trung, tạo nên phong cách tinh tế mà vẫn hòa nhịp cùng xu hướng thời trang quốc tế.',
                'brand' => 'Vascara',
                'selling_price' => '500000',
                'original_price' => '1105000',
                'quantity' => 5,
                'image' => 'uploads/product/image-2.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'category_id' => 3,
                'name' => 'Giày thể thao Nike Air Force 1 High All White',
                'description' => 'Giày sneakers được làm từ chất liệu da cao cấp với độ ôm vừa chân. Đôi giày sở hữu thiết kế đơn giản đẹp mắt và vô cùng thanh lịch giúp bạn dễ phối đồ theo nhiều phong cách. Phần đế giày có độ ma sát cao, hạn chế trơn trượt cho người sử dụng.',
                'brand' => 'Nike Air Force 1',
                'selling_price' => '3500000',
                'original_price' => '4200000',
                'quantity' => 10,
                'image' => 'uploads/product/image-4.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'category_id' => 2,
                'name' => 'Váy Chữ A Tay Dài Phối Nơ Thun Giấy',
                'description' => 'Váy chữ A tay dài phối nơ kiểu dáng thanh lịch, dịu dàng, trang nhã: Thiết kế váy ngắn khoe chân quyến rũ, viền cổ cách điệu ấn tượng. Ống tay dài điệu đà nữ tính, thân váy đính kèm nơ',
                'brand' => 'Maison',
                'selling_price' => '380000',
                'original_price' => '400000',
                'quantity' => 20,
                'image' => 'uploads/product/image-3.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'category_id' => 1,
                'name' => 'Áo thun oversize Force Majerure',
                'description' => 'Cotton 2 chiều Force Majerure là loại vải được dệt từ sợi bông nguyên chất và chỉ có lẫn một ít sợi spandex. Form áo thiết kế dáng suông, rộng rãi đảm bảo mang đến sự thuận tiện và thoải mái cho hoạt động. ',
                'brand' => 'Force Majerure',
                'selling_price' => '125000',
                'original_price' => '200000',
                'quantity' => 50,
                'image' => 'uploads/product/image-5.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
