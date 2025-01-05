<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'tmdb_movie_id', 'type', 'added_at', 'watch_time',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
