<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        // // Regenerate the session to prevent session fixation attacks
        // $request->session()->regenerate();

        //  // Log authenticated user information
        // Log::info('Authenticated user: ', $request->user()->toArray());

        //  // Set customerID in the session
        // $customerID = $request->user()->id;
        // session(['customerID' => $request->user()->id]);
        // Log::info('Customer ID set in session: ' . session('customerID'));


        //     // Log the customer ID for debugging
        // Log::info('Customer ID set in session after login: ' . $request->user()->id);

        $request->session()->regenerate();
        if($request->user()->userType === 'admin'){

            return redirect()->route('AdminDashboard');
        }
        if ($request->user()->userType === 'reciption') {

            return redirect()->route('ReceptionDashboard');
        }
        return redirect()->intended(route('CustomerDashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }


}
