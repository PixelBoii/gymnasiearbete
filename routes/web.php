<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\DeviceController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function() {
    Route::get('/', function (Request $request) {
        return Inertia::render('Dashboard', [
            'devices' => $request->user()->devices()->with('locations', 'lastLocation')->get(),
        ]);
    })->name('dashboard');

    Route::prefix('/devices')->group(function() {
        Route::resource('/', DeviceController::class)->only([
            'store', 'update', 'destroy'
        ]);
    });
});

require __DIR__.'/auth.php';
