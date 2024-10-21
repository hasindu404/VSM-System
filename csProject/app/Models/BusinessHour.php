<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessHour extends Model
{
    use HasFactory;

    protected $table = 'business_hours';

    protected $fillable =[
        'openingTime',
        'closingTime',
        'isOpen',

    ];

    protected $guarded = ['dayOfWeek'];
}
