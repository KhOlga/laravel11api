<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
	public function index()
	{
		return CategoryResource::collection(Category::all());
	}

	public function show(Category $category)
	{
		return new CategoryResource($category);
	}

	public function list()
	{
		return CategoryResource::collection(Category::all());
	}

	public function store(StoreCategoryRequest  $request)
	{
		$category = Category::create($request->validated());

		return new CategoryResource($category);
	}

	public function update(Category $category, StoreCategoryRequest $request)
	{
		$category->update($request->validated());

		return new CategoryResource($category);
	}

	public function destroy(Category $category)
	{
		$category->delete();

		return response()->noContent();
	}
}
