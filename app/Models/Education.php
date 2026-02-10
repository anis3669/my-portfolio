<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $fillable = [
        'degree',
        'institution',
        'start_date',
        'end_date',
        'grade',
        'description',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];
}
