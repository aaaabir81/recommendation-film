<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        Log::info('Elenco degli utenti recuperato', ['users' => $users]);
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Dati della richiesta per la creazione di un utente', ['request' => $request->all()]);

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
        ]);

        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
        ]);

        Log::info('Utente creato con successo', ['user' => $user]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        Log::info('Dettagli dell\'utente recuperati', ['user' => $user]);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        Log::info('Dati della richiesta per l\'aggiornamento di un utente', ['request' => $request->all()]);

        $request->validate(
            [
                'first_name' => ['required', 'string', 'max:255'],
                'last_name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email'],
            ],
            [
                'first_name.required' => 'Il nome è obbligatorio.',
                'last_name.required' => 'Il cognome è obbligatorio.',
                'email.required' => 'L\'email è obbligatoria.',
                'email.email' => 'Devi inserire un\'email valida.',
            ]
        );

        $user = User::findOrFail($id);
        if (!$user) {
            Log::error('Utente non trovato', ['id' => $id]);
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->save();

        Log::info('Utente aggiornato con successo', ['user' => $user]);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Log::info('Richiesta di eliminazione dell\'utente', ['id' => $id]);

        User::destroy($id);

        Log::info('Utente eliminato con successo', ['id' => $id]);

        return response()->json(null, 204);
    }
}
