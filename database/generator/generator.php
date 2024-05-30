<?php

use Core\Database\Generator;
use App\Models\User;
use Core\Valid\Hash;

return new class implements Generator
{
    /**
     * Generate nilai database
     *
     * @return void
     */
    public function run()
    {
        $user = User::find('ari@akutopup.com', 'email');

        if (!$user->exist()) {
            $user = User::create([
                'name' => 'Ari Sawali',
                'email' => 'ari@akutopup.com',
                'password' => Hash::make('12345678')
            ]);
        }


        $user->fill([
            'is_filter' => true,
            'access_key' => Hash::rand(25),
        ])->save();
    }
};
