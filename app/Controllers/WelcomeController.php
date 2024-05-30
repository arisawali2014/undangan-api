<?php

namespace App\Controllers;

use App\Response\JsonResponse;
use Core\Routing\Controller;
use Core\Http\Request;

class WelcomeController extends Controller
{
    private $json;

    public function __construct(JsonResponse $json)
    {
        $this->json = $json;
    }
    public function __invoke(): \Core\View\View
    {
        return $this->view('welcome');
    }

    public function saweria_leaderboard(Request $request): JsonResponse
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://backend.saweria.co/widgets/leaderboard/'.$request->range,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Stream-Key: fd39b673a80ad1be9d51d0394ccdd5a5'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return $this->json->success(json_decode($response),200);
    }
}
