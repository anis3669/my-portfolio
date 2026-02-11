@extends('layouts.app')

@section('title', 'Anis Bastola - Portfolio')

@section('content')
  <!-- Book Container -->
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div id="book" class="mx-auto"></div>
  </div>

  <!-- Hidden pages content -->
  <div id="book-pages" class="hidden">
    <!-- Page 1 Left: Profile -->
    <div class="book-page">
      @if($profile)
        <div class="text-center">
          <img src="{{ $profile->photo ? Storage::url($profile->photo) : 'https://ui-avatars.com/api/?name='.urlencode($profile->name).'&size=200' }}" 
               alt="{{ $profile->name }}" 
               class="w-48 h-48 rounded-full mx-auto border-4 border-blue-500 shadow-2xl object-cover mb-6">

          <h1 class="text-5xl font-bold mb-2">{{ $profile->name }}</h1>
          <p class="text-2xl text-blue-600 dark:text-blue-400 mb-4">{{ $profile->title }}</p>

          <p class="text-lg max-w-3xl mx-auto leading-relaxed mb-8">{{ $profile->bio }}</p>

          <div class="flex justify-center gap-8 text-3xl mb-8">
            @if($profile->linkedin)<a href="{{ $profile->linkedin }}" target="_blank" class="hover:text-blue-500 transition"><i class="fab fa-linkedin"></i></a>@endif
            @if($profile->instagram)<a href="{{ $profile->instagram }}" target="_blank" class="hover:text-pink-600 transition"><i class="fab fa-instagram"></i></a>@endif
            @if($profile->twitter)<a href="{{ $profile->twitter }}" target="_blank" class="hover:text-sky-500 transition"><i class="fab fa-twitter"></i></a>@endif
            @if($profile->facebook)<a href="{{ $profile->facebook }}" target="_blank" class="hover:text-blue-700 transition"><i class="fab fa-facebook"></i></a>@endif
          </div>

          @if($profile->resume)
            <a href="{{ Storage::url($profile->resume) }}" download 
               class="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition shadow-lg">
              <i class="fas fa-download mr-3"></i> Download Resume
            </a>
          @endif
        </div>
      @else
        <p class="text-center text-xl text-gray-500">Profile data not added yet.</p>
      @endif
    </div>

    <!-- Page 1 Right: Work Experience -->
    <div class="book-page relative pl-16">
      <h2 class="text-4xl font-bold mb-10 text-center">Work Experience</h2>
      @forelse($experiences as $exp)
        <div class="mb-12 relative">
          <div class="timeline-dot"></div>
          <h3 class="text-2xl font-semibold">{{ $exp->title }}</h3>
          <p class="text-xl text-blue-600 dark:text-blue-400 mt-1">{{ $exp->company }} • {{ $exp->start_date }} — {{ $exp->end_date ?? 'Present' }}</p>
          <div class="mt-4 text-lg leading-relaxed prose dark:prose-invert max-w-none">
            {!! nl2br($exp->description) !!}
          </div>
        </div>
      @empty
        <p class="text-center text-xl text-gray-500">No experience entries yet.</p>
      @endforelse
    </div>

    <!-- Page 2 Left: Education -->
    <div class="book-page">
      <h2 class="text-4xl font-bold mb-10 text-center">Education</h2>
      @forelse($educations as $edu)
        <div class="mb-10">
          <h3 class="text-2xl font-semibold">{{ $edu->degree }}</h3>
          <p class="text-xl text-blue-600 dark:text-blue-400">{{ $edu->institution }}</p>
          <p class="text-lg mt-2">{{ $edu->start_date }} — {{ $edu->end_date ?? 'Running' }}</p>
          @if($edu->grade)<p class="text-lg font-medium mt-1">Grade/CGPA: {{ $edu->grade }}</p>@endif
          @if($edu->description)<p class="mt-3 text-lg">{!! nl2br($edu->description) !!}</p>@endif
        </div>
      @empty
        <p class="text-center text-xl text-gray-500">No education entries yet.</p>
      @endforelse
    </div>

    <!-- Page 2 Right: Services -->
    <div class="book-page">
      <h2 class="text-4xl font-bold mb-10 text-center">My Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        @forelse($services as $service)
          <div class="border border-gray-200 dark:border-gray-700 p-8 rounded-2xl hover:shadow-xl transition-all">
            @if($service->icon)
              <img src="{{ Storage::url($service->icon) }}" alt="" class="w-20 h-20 mx-auto mb-6 object-contain">
            @endif
            <h3 class="text-2xl font-bold text-center mb-4">{{ $service->title }}</h3>
            <p class="text-lg text-center leading-relaxed">{{ $service->description }}</p>
          </div>
        @empty
          <p class="col-span-2 text-center text-xl text-gray-500">No services added yet.</p>
        @endforelse
      </div>
    </div>

    <!-- Page 3: Skills -->
    <div class="book-page">
      <h2 class="text-4xl font-bold mb-10 text-center">My Skills</h2>
      @foreach($skills as $category => $group)
        <div class="mb-12">
          <h3 class="text-3xl font-semibold mb-6">{{ $category }}</h3>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
            @foreach($group as $skill)
              <div class="skill-item">
                @if($skill->logo)
                  <img src="{{ Storage::url($skill->logo) }}" alt="{{ $skill->name }}" class="w-16 h-16 mx-auto object-contain mb-3">
                @endif
                <p class="font-medium">{{ $skill->name }}</p>
              </div>
            @endforeach
          </div>
        </div>
      @endforeach
    </div>

    <!-- Page 4: Featured Projects -->
    <div class="book-page">
      <h2 class="text-4xl font-bold mb-10 text-center">Featured Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        @forelse($projects as $project)
          <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all">
            @if($project->screenshot)
              <img src="{{ Storage::url($project->screenshot) }}" alt="{{ $project->title }}" class="w-full h-64 object-cover">
            @endif
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-3">{{ $project->title }}</h3>
              <p class="text-lg mb-4">{{ Str::limit($project->description, 150) }}</p>
              @if($project->link)
                <a href="{{ $project->link }}" target="_blank" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                  View Project <i class="fas fa-external-link-alt ml-2"></i>
                </a>
              @endif
            </div>
          </div>
        @empty
          <p class="col-span-2 text-center text-xl text-gray-500">No projects added yet.</p>
        @endforelse
      </div>
    </div>

    <!-- Page 5: Blank or additional content (optional) -->
    <div class="book-page">
      <h2 class="text-4xl font-bold mb-8 text-center">More Coming Soon</h2>
      <p class="text-center text-xl opacity-70">Additional projects, certifications, or content can be added here later.</p>
    </div>

    <!-- Page 6: Contact Me -->
    <div class="book-page contact-page">
      <h2 class="text-4xl font-bold mb-10 text-center">Contact Me!</h2>
      @if($contact)
        <div class="max-w-2xl mx-auto space-y-8 text-center">
          <div class="flex items-center justify-center gap-6 text-2xl">
            <i class="fas fa-envelope text-3xl text-blue-400"></i>
            <a href="mailto:{{ $contact->email }}" class="hover:underline">{{ $contact->email }}</a>
          </div>
          <div class="flex items-center justify-center gap-6 text-2xl">
            <i class="fas fa-phone text-3xl text-green-400"></i>
            <a href="tel:+977{{ $contact->phone }}" class="hover:underline">+977 {{ $contact->phone }}</a>
          </div>
          <div class="flex items-center justify-center gap-6 text-2xl">
            <i class="fas fa-map-marker-alt text-3xl text-red-400"></i>
            <span>{{ $contact->current_address ?? $contact->address }}</span>
          </div>
          @if($contact->permanent_address)
            <div class="flex items-center justify-center gap-6 text-xl opacity-90">
              <span>Permanent Address: {{ $contact->permanent_address }}</span>
            </div>
          @endif

          <div class="flex justify-center gap-12 mt-12 text-4xl">
            @if($contact->linkedin)<a href="{{ $contact->linkedin }}" target="_blank"><i class="fab fa-linkedin hover:scale-125 transition"></i></a>@endif
            @if($contact->instagram)<a href="{{ $contact->instagram }}" target="_blank"><i class="fab fa-instagram hover:scale-125 transition"></i></a>@endif
            @if($contact->twitter)<a href="{{ $contact->twitter }}" target="_blank"><i class="fab fa-twitter hover:scale-125 transition"></i></a>@endif
            @if($contact->facebook)<a href="{{ $contact->facebook }}" target="_blank"><i class="fab fa-facebook hover:scale-125 transition"></i></a>@endif
          </div>
        </div>
      @else
        <p class="text-center text-2xl opacity-70">Contact details not added yet.</p>
      @endif
    </div>
  </div>
@endsection

@section('scripts')
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const pageFlip = new StPageFlip(document.getElementById('book'), {
        width: 600,
        height: 800,
        size: 'stretch',
        minWidth: 320,
        maxWidth: 1200,
        minHeight: 420,
        maxHeight: 1600,
        flippingTime: 1200,
        usePortrait: false,
        showCover: false,
        drawShadow: true,
        maxShadowOpacity: 0.4,
        mobileScrollSupport: true,
        startPage: 0,
        startZIndex: 0
      });

      // Load pages from hidden div
      const pages = document.querySelectorAll('#book-pages > div');
      pageFlip.loadFromHTML(pages);

      // Navigation arrows
      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '<i class="fas fa-arrow-left text-4xl text-blue-600"></i>';
      prevBtn.className = 'fixed left-8 top-1/2 -translate-y-1/2 z-50 p-5 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-2xl hover:bg-blue-100 dark:hover:bg-blue-900 transition';
      prevBtn.onclick = () => pageFlip.flipPrev();
      document.body.appendChild(prevBtn);

      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '<i class="fas fa-arrow-right text-4xl text-blue-600"></i>';
      nextBtn.className = 'fixed right-8 top-1/2 -translate-y-1/2 z-50 p-5 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-2xl hover:bg-blue-100 dark:hover:bg-blue-900 transition';
      nextBtn.onclick = () => pageFlip.flipNext();
      document.body.appendChild(nextBtn);

      // Disable arrows on first/last page
      pageFlip.on('flip', () => {
        const current = pageFlip.getCurrentPageIndex();
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= pageFlip.getPageCount() - 1;
      });
    });
  </script>
@endsection