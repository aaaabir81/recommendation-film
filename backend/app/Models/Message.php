<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['disc_id', 'sender', 'message', 'sent_at'];

    public $timestamps = false; // Active les timestamps

    public function discussion()
    {
        return $this->belongsTo(Discussion::class, 'disc_id');
    }
}
