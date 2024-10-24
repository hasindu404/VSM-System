<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehical extends Model
{

    use HasFactory;

    protected $fillable = [
        'vehicalid',
        'brand',
        'year',
        'catagory',
        'last_service_date',
        'colour',
        
    ];
}
