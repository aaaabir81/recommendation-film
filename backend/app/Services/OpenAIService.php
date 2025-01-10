<?php
namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class OpenAIService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.openai.com/v1/',
            'headers' => [
                'Authorization' => 'Bearer ' . config('services.openai.api_key'),
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    public function chat(array $messages)
    {
        try {
            $response = $this->client->post('chat/completions', [
                'json' => [
                    'model' => 'gpt-3.5-turbo',
                    'messages' => $messages,
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            // Gestion des erreurs
            return ['error' => 'Unable to communicate with OpenAI. Please try again later.'];
        }
    }
}
