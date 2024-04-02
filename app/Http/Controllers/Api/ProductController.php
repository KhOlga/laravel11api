<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

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
		$product = Product::create($request->validated());

		return new ProductResource($product);
	}
}
