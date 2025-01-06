<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $fillable = [
        'fname', 'lname', 'email', 'password', 'birth_date', 'genre', 'preferred_type', 'preferences',
    ];

    protected $casts = [
        'preferences' => 'array', // For storing the preferences as JSON
    ];

    // Relations
    public function wishlist()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function discussions()
    {
        return $this->hasMany(Discussion::class);
    }
}
