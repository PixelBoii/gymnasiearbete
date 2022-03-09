<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Device;
use App\Models\DeviceLocation;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->has(
            Device::factory()->count(5)->has(
                DeviceLocation::factory()->count(5),
                'locations'
            )
        )->create();
    }
}
