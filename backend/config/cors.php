<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Options
    |--------------------------------------------------------------------------
    |
    | Here you can configure your settings for cross-origin requests.
    |
    */

    'supports_credentials' => false,

    'allowed_origins' => ['http://localhost:4200'],  // Remplace par ton adresse frontend

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'allowed_methods' => ['*'],  // Tu peux restreindre les méthodes si nécessaire

    'exposed_headers' => [],

    'max_age' => 0,

    'hosts' => [],
];
