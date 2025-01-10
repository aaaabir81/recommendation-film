<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost, and others. This file provides a
    | convenient location for storing various credentials.
    |
    */

    'openai' => [
        'api_key' => env('OPENAI_API_KEY'),
    ],

    // Tu peux ajouter d'autres services si nécessaire
];
