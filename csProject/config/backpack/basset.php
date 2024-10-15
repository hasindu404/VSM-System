<?php

return [

    
    
    'disk' => env('BASSET_DISK', 'public'),

   
    'prefix' => env('BASSET_PREFIX', '/backpack-basset'),

    'cache' => [
        'enabled' => env('BASSET_CACHE_ENABLED', true),
        'duration' => env('BASSET_CACHE_DURATION', 1440), 
    ],

   
    'versioning' => [
        'enabled' => env('BASSET_VERSIONING', true),
    ],

   
    'assets' => [
       
    ],
    
];
