<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EducationResource\Pages;
use App\Models\Education;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;

class EducationResource extends Resource
{
    protected static ?string $model = Education::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('degree')
                    ->required()
                    ->label('Degree'),

                TextInput::make('institution')
                    ->required()
                    ->label('Institution'),

                TextInput::make('start_date')
                    ->required()
                    ->label('Start Date'),

                TextInput::make('end_date')
                    ->label('End Date (or "Running")'),

                TextInput::make('grade')
                    ->label('Grade / CGPA'),

                Textarea::make('description')
                    ->rows(4)
                    ->label('Additional Details'),

                TextInput::make('order')
                    ->numeric()
                    ->default(0)
                    ->label('Order'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('degree'),
                Tables\Columns\TextColumn::make('institution'),
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
            'index' => Pages\ListEducation::route('/'),
            'create' => Pages\CreateEducation::route('/create'),
            'edit' => Pages\EditEducation::route('/{record}/edit'),
        ];
    }
}
