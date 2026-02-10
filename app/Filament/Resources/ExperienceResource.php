<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExperienceResource\Pages;
use App\Models\Experience;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;

class ExperienceResource extends Resource
{
    protected static ?string $model = Experience::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                    ->required()
                    ->label('Job Title'),

                TextInput::make('company')
                    ->required()
                    ->label('Company'),

                TextInput::make('start_date')
                    ->required()
                    ->label('Start Date (e.g., September 2025)'),

                TextInput::make('end_date')
                    ->label('End Date (leave empty if current)'),

                RichEditor::make('description')
                    ->required()
                    ->toolbarButtons([
                        'bold', 'italic', 'bulletList', 'orderedList',
                    ])
                    ->label('Description / Responsibilities'),

                TextInput::make('order')
                    ->numeric()
                    ->default(0)
                    ->label('Order (higher = appears first)'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('company'),
                Tables\Columns\TextColumn::make('start_date'),
                Tables\Columns\TextColumn::make('end_date'),
                Tables\Columns\TextColumn::make('order')->sortable(),
            ])
            ->defaultSort('order', 'desc')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListExperiences::route('/'),
            'create' => Pages\CreateExperience::route('/create'),
            'edit' => Pages\EditExperience::route('/{record}/edit'),
        ];
    }
}
