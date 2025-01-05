<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'tmdb_movie_id', 'type', 'added_at',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
