<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Movies</title>
</head>
<body>
    <h1>Popular Movies</h1>
    @if(isset($movies['results']) && count($movies['results']) > 0)
        <ul>
            @foreach ($movies['results'] as $movie)
                <li>{{ $movie['title'] }} - {{ $movie['overview'] }}</li>
            @endforeach
        </ul>
    @else
        <p>No movies found.</p>
    @endif
</body>
</html>
