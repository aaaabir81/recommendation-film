<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function show($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json($user);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    public function store(Request $request)
{
    $request->validate([
        'fname' => 'required|string',
        'lname' => 'required|string',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:6',
        'birth_date' => 'required|date',
        'genre' => 'required|string',
        'preferred_type' => 'required|string',
        'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Vérifier si un fichier est téléchargé
    $profilePictureUrl = null;
    if ($request->hasFile('profile_picture')) {
        $file = $request->file('profile_picture');
        
        // Stocker le fichier dans le dossier public/profile_pictures
        $path = $file->store('profile_pictures', 'public');  // Utilise 'public' pour stocker dans storage/app/public
        $profilePictureUrl = asset('storage/' . $path); // Générer l'URL accessible publiquement
    }

    // Créer un utilisateur avec les données du formulaire et l'URL de la photo de profil
    $userData = $request->all();
    $userData['profile_picture_url'] = $profilePictureUrl;  // Ajouter l'URL de l'image

    $user = User::create($userData);

    return response()->json($user, 201);
}


    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->update($request->all());
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function login(Request $request)
    {
        // Valider les données d'entrée
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        // Rechercher l'utilisateur par email
        $user = User::where('email', $request->email)->first();
    
        // Vérifier si l'utilisateur existe et si le mot de passe est correct (sans hashage)
        if (!$user || $user->password !== $request->password) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }
    
        // Générer un token d'authentification
        $token = $user->createToken('authToken')->plainTextToken;
    
        // Retourner les données utilisateur et le token
        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function logout(Request $request)
    {
        // Supprime le token de l'utilisateur connecté
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie'], 200);
    }

}
