<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'bio',
        'photo',
        'resume',
        'twitter',
        'linkedin',
        'instagram',
        'facebook',
        // optional extra fields if you added them later
        'date_of_birth',
        'current_address',
        'permanent_address',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
