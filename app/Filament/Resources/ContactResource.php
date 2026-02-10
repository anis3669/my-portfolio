<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactResource\Pages;
use App\Models\Contact;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

use Filament\Forms\Components\TextInput;

class ContactResource extends Resource
{
    protected static ?string $model = Contact::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationLabel = 'Contact Info';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('email')
                    ->email()
                    ->required()
                    ->label('Email'),

                TextInput::make('phone')
                    ->required()
                    ->label('Phone'),

                TextInput::make('address')
                    ->required()
                    ->label('Address'),

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
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('phone'),
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
            'index' => Pages\ManageContacts::route('/'),
        ];
    }
}   
