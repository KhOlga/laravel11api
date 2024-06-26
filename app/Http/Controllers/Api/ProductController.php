<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditProductRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class ProductController extends Controller
{
	public function index()
	{
		$products = Product::with('category')
			->when(request('category'), function (Builder $query) {
				$query->where('category_id', request('category'));
			})
			->paginate(8);

		return ProductResource::collection($products);
	}

	public function store(StoreProductRequest $request)
	{
		$data = $request->validated();

		if ($request->hasFile('photo')) {
			$file = $request->file('photo');
			$name = 'products/' . Str::uuid() . '.' . $file->extension();
			$file->storePubliclyAs('public', $name);
			$data['photo'] = $name;
		}

		$product = Product::create($data);

		return new ProductResource($product);
	}

	public function show(Product $product)
	{
		$product->load('category');
		return new ProductResource($product);
	}

	public function update(Product $category, EditProductRequest $request)
	{
		$category->update($request->validated());

		return new ProductResource($category);
	}
}
