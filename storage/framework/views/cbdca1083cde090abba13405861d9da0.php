<!DOCTYPE html>
<html lang="en" class="scroll-smooth"
    x-data="{
        darkMode: localStorage.getItem('darkMode') === 'true'
                  || (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches),
        mobileMenu: false
    }"
    x-bind:class="{ 'dark': darkMode }">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $__env->yieldContent('title', 'Anis Bastola — Full Stack Developer'); ?></title>

    
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"></script>

    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js']); ?>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <?php echo $__env->yieldContent('head'); ?>
</head>
<body>

    
    <header class="navbar">
        <div class="wrap w-full flex items-center justify-between gap-8">

            
            <a href="#hero" class="text-base font-bold tracking-tight flex items-center gap-1"
               style="color: var(--tx1);">
                Anis<span style="color: var(--p600);">.</span>
            </a>

            
            <nav class="hidden md:flex items-center gap-7">
                <a href="#hero"       class="nav-link">Home</a>
                <a href="#about"      class="nav-link">About</a>
                <a href="#skills"     class="nav-link">Skills</a>
                <a href="#experience" class="nav-link">Experience</a>
                <a href="#services"   class="nav-link">Services</a>
                <a href="#projects"   class="nav-link">Projects</a>
                <a href="#contact"    class="nav-link">Contact</a>
            </nav>

            <div class="flex items-center gap-2">
                
                <button @click="darkMode = !darkMode; localStorage.setItem('darkMode', darkMode)"
                        class="theme-btn" aria-label="Toggle theme">
                    <i x-show="!darkMode" class="fas fa-moon text-xs" style="color:var(--p600)"></i>
                    <i x-show="darkMode"  class="fas fa-sun  text-xs" style="color:#fbbf24"></i>
                </button>

                
                <button @click="mobileMenu = !mobileMenu"
                        class="theme-btn md:hidden" aria-label="Menu">
                    <i class="fas fa-bars text-xs"></i>
                </button>
            </div>
        </div>

        
        <div x-show="mobileMenu"
             x-transition:enter="transition ease-out duration-150"
             x-transition:enter-start="opacity-0 -translate-y-2"
             x-transition:enter-end="opacity-100 translate-y-0"
             class="absolute top-full inset-x-0 md:hidden px-6 py-5 flex flex-col gap-4"
             style="background: var(--surface); border-top: 1px solid var(--bd);">
            <a @click="mobileMenu=false" href="#hero"       class="nav-link">Home</a>
            <a @click="mobileMenu=false" href="#about"      class="nav-link">About</a>
            <a @click="mobileMenu=false" href="#skills"     class="nav-link">Skills</a>
            <a @click="mobileMenu=false" href="#experience" class="nav-link">Experience</a>
            <a @click="mobileMenu=false" href="#services"   class="nav-link">Services</a>
            <a @click="mobileMenu=false" href="#projects"   class="nav-link">Projects</a>
            <a @click="mobileMenu=false" href="#contact"    class="nav-link">Contact</a>
        </div>
    </header>

    
    <main class="pt-16">
        <?php echo $__env->yieldContent('content'); ?>
    </main>

    
    <footer style="border-top: 1px solid var(--bd); background: var(--surface);">
        <div class="wrap py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span class="text-sm" style="color: var(--tx3);">
                &copy; <?php echo e(date('Y')); ?> Anis Bastola. All rights reserved.
            </span>
            <div class="flex items-center gap-3">
                <a href="https://linkedin.com/anisbastola"   target="_blank" class="social-btn"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://github.com/anis3669"        target="_blank" class="social-btn"><i class="fab fa-github"></i></a>
                <a href="https://instagram.com/anisbastola"  target="_blank" class="social-btn"><i class="fab fa-instagram"></i></a>
                <a href="https://facebook.com/anis.bastola11" target="_blank" class="social-btn"><i class="fab fa-facebook-f"></i></a>
            </div>
        </div>
    </footer>

    <?php echo $__env->yieldContent('scripts'); ?>
</body>
</html>
<?php /**PATH C:\Users\User\Desktop\laravel\my-portfolio\resources\views/portfolio.blade.php ENDPATH**/ ?>