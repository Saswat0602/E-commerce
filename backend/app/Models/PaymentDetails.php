<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'mobileNumber',
        'alternateNumber',
        'address',
        'user_id', 
        'order_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
