<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestAPIController extends Controller
{
    //health check
    public function index()
    {
        return "hello laravel api";
    }

}
