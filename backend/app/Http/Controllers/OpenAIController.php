<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class OpenAIController extends Controller
{
    public function getCineChillResponse(Request $request)
{
    $client = new Client();
    $apiKey = config('services.openai.api_key');

    $messages = $request->input('messages');

    // Log des messages envoyés
    \Log::info('Messages envoyés à OpenAI :', $messages);

    try {
        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-3.5-turbo',
                'messages' => $messages,
            ],
        ]);

        $responseBody = json_decode($response->getBody(), true);

        // Log de la réponse reçue
        \Log::info('Réponse reçue de OpenAI :', $responseBody);

        return response()->json($responseBody);
    } catch (\Exception $e) {
        \Log::error('Erreur lors de la communication avec OpenAI : ' . $e->getMessage());
        return response()->json([
            'error' => 'Failed to get response from OpenAI: ' . $e->getMessage()
        ], 500);
    }
}


}
