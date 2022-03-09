<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;

class DeviceLocation extends Model
{
    use HasFactory, SpatialTrait;

    protected $fillable = [
        'device_id',
        'latitude',
        'longitude',
        'altitude'
    ];


    protected $spatialFields = [
        'position',
    ];
}
