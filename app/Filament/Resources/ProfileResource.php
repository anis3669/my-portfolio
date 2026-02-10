<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProfileResource\Pages;
use App\Models\Profile;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;

class ProfileResource extends Resource
{
    protected static ?string $model = Profile::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-circle';

    protected static ?string $navigationLabel = 'My Profile';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->default('Anis Bastola')
                    ->label('Full Name'),

                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->default('Full Stack Web Developer Intern')
                    ->label('Professional Title'),

                Textarea::make('bio')
                    ->required()
                    ->rows(5)
                    ->default('A dedicated and quick-learning developer seeking a full stack role where I can apply my technical skills, grow professionally, and contribute to real-world projects.')
                    ->label('Career Summary / Objective'),

                DatePicker::make('date_of_birth')
                    ->label('Date of Birth')
                    ->default('2005-06-23'),

                FileUpload::make('photo')
                    ->image()
                    ->directory('photos')
                    ->required()
                    ->label('Profile Photo (Upload your picture)'),

                FileUpload::make('resume')
                    ->acceptedFileTypes(['application/pdf'])
                    ->directory('resumes')
                    ->required()
                    ->label('Resume PDF (Downloadable on website)'),

                TextInput::make('current_address')
                    ->label('Current Address')
                    ->default('Lokanthali, Bhaktapur'),

                TextInput::make('permanent_address')
                    ->label('Permanent Address')
                    ->default('Diktel-6, Khotang'),

                TextInput::make('linkedin')
                    ->url()
                    ->prefix('https://linkedin.com/in/')
                    ->label('LinkedIn Profile'),

                TextInput::make('instagram')
                    ->url()
                    ->prefix('https://instagram.com/')
                    ->label('Instagram'),

                TextInput::make('twitter')
                    ->url()
                    ->prefix('https://twitter.com/')
                    ->label('Twitter / X'),

                TextInput::make('facebook')
                    ->url()
                    ->prefix('https://facebook.com/')
                    ->label('Facebook'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('title'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageProfiles::route('/'),
        ];
    }
}
