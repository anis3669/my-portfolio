<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'phone',
        'address',
        'current_address',
        'permanent_address',
        'twitter',
        'linkedin',
        'instagram',
        'facebook',
        // optional
        'extra_info',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
