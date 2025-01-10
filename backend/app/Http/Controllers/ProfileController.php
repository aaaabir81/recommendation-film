<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    // Récupérer les informations de l'utilisateur connecté
    public function show()
    {
        $user = Auth::user(); // Récupère l'utilisateur actuellement connecté.

        if ($user) {
            return response()->json($user);
        }

        return response()->json(['message' => 'Utilisateur non trouvé.'], 404);
    }
    public function getProfile()
    {
        return response()->json(Auth::user());
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'birth_date' => 'nullable|date',
            'genre' => 'nullable|string',
            'preferred_type' => 'nullable|string',
            'preferences' => 'nullable|string',
        ]);
        // Gestion spécifique pour le mot de passe
        if ($request->filled('password')) {
            $user->password = $request->password; // Pas de hachage
        }

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            \Log::info('Chemin de la photo : ' . $path);
            $user->profile_picture_url = asset('storage/' . $path);
        }
        

        $user->update($validated);

        return response()->json($user);
    }
}
