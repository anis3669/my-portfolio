<?php
use App\Models\Profile;
use App\Models\Contact;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Project;

Route::get('/', function () {
    return view('portfolio', [
        'profile'     => Profile::first() ?? null,
        'contact'     => Contact::first() ?? null,
        'experiences' => Experience::orderBy('order', 'desc')->get(),
        'educations'  => Education::orderBy('order', 'desc')->get(),
        'services'    => Service::orderBy('order')->get(),
        'skills'      => Skill::orderBy('order')->get()->groupBy('category'),
        'projects'    => Project::orderBy('order')->get(),
    ]);
})->name('portfolio');
