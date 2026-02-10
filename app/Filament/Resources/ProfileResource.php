<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProfileResource\Pages;
use App\Models\Profile;
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
                ->label('Full Name'),

            TextInput::make('title')
                ->required()
                ->maxLength(255)
                ->label('Professional Title'),

            Textarea::make('bio')
                ->required()
                ->rows(6)
                ->label('Bio / Career Summary'),

            FileUpload::make('photo')
                ->image()
                ->directory('photos')
                ->required()
                ->label('Profile Photo'),

            FileUpload::make('resume')
                ->acceptedFileTypes(['application/pdf'])
                ->directory('resumes')
                ->required()
                ->label('Resume PDF'),

            TextInput::make('twitter')
                ->url()
                ->prefix('https://twitter.com/')
                ->label('Twitter'),

            TextInput::make('linkedin')
                ->url()
                ->prefix('https://linkedin.com/in/')
                ->label('LinkedIn'),

            TextInput::make('instagram')
                ->url()
                ->prefix('https://instagram.com/')
                ->label('Instagram'),

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
                Tables\Columns\TextColumn::make('name')->label('Name'),
                Tables\Columns\TextColumn::make('title')->label('Title'),
                Tables\Columns\ImageColumn::make('photo')->label('Photo'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageProfiles::route('/'),
        ];
    }
}
