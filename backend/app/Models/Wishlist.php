<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;
    protected $table = 'wishlist';
    protected $fillable = [
        'user_id', 'tmdb_movie_id', 'type', 'added_at', 'watch_time',
    ];
    public $timestamps = false; // Désactive les colonnes created_at et updated_at

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
