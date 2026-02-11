<!DOCTYPE html>
<html lang="en" class="scroll-smooth" x-data="{ darkMode: localStorage.getItem('darkMode') === 'true' || (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches) }" x-bind:class="{ 'dark': darkMode }">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Anis Bastola - Full Stack Developer')</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- StPageFlip CDN -->
    <script src="https://unpkg.com/st-page-flip@2.0.7/dist/st-page-flip.min.js"></script>

    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    @yield('head')
</head>
<body class="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 antialiased">

    <!-- Dark/Light Toggle -->
    <button @click="darkMode = !darkMode; localStorage.setItem('darkMode', darkMode)"
            class="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-80/80 shadow-xl hover:scale-110 transition-all">
        <i x-show="!darkMode" class="fas fa-moon text-xl text-indigo-600"></i>
        <i x-show="darkMode" class="fas fa-sun text-xl text-yellow-400"></i>
    </button>

    @yield('content')

    <!-- Alpine.js for dark mode -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    @yield('scripts')
</body>
</html>