<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;

class ProductController extends Controller
{
	public function index()
	{
		$products = Product::with('category')
			->when(request('category'), function (Builder $query) {
				$query->where('category_id', request('category'));
			})
			->paginate(3);

		return ProductResource::collection($products);
	}
}
