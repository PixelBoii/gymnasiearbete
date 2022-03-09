<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'user_id', 'battery_level'];

    public function locations()
    {
        return $this->hasMany(DeviceLocation::class);
    }

    public function lastLocation()
    {
        return $this->hasOne(DeviceLocation::class)->latestOfMany();
    }
}
