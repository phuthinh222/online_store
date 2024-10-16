<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'role_as' => 1
        ]);
        DB::table('users')->insert([
            'name' => 'Người dùng 1',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('user12345'),
            'role_as' => 0
        ]);
        DB::table('users')->insert([
            'name' => 'Người dùng 2',
            'email' => 'user2@gmail.com',
            'password' => Hash::make('user12345'),
            'role_as' => 0
        ]);
    }
}
