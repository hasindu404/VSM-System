<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BusinessHour;

class BusinessHoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $businessHours = [
            ['dayOfWeek' => 'Monday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true],
            ['dayOfWeek' => 'Tuesday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true],
            ['dayOfWeek' => 'Wednesday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true],
            ['dayOfWeek' => 'Thursday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true],
            ['dayOfWeek' => 'Friday', 'openingTime' => '09:00', 'closingTime' => '17:00', 'isOpen' => true],
            ['dayOfWeek' => 'Saturday', 'openingTime' => '10:00', 'closingTime' => '14:00', 'isOpen' => true],
            ['dayOfWeek' => 'Sunday', 'openingTime' => null, 'closingTime' => null, 'isOpen' => false], // Closed on Sunday
            
        ];

        foreach ($businessHours as $hours) {
            BusinessHour::create($hours);
        }
    }
}
