$(document).ready(function () {
	const outputEl = $(".product-listing")
	
	// you are requesting access to these files here, so you can use them as you go. 
	$.ajax({
		"url": "products.json",
		"method": "GET"
		// all the products.json is nested with in productData.
	}).then(productData => {
		let totalPrint = ""
        
		const productInfo = productData.products 

		let saleInfo = "<section id='saleContainer'></section"
        
		$.ajax({
			"url": "categories.json",
			"method": "GET"
		}).then (categoryData => {

			const categoryInfo = categoryData.categories

			productInfo.forEach(sale => {
				// const productCategory = categoryInfo.find(current => current.id === categoryData.category_id)
				totalPrint += `
                <article id="product_${sale.id}>
				<p>Name: ${sale.name}</p>
				<p>Category: ${categoryInfo.name}</p>
				<p>Price: ${sale.price}</p>
                </article>
				`  
			})
			outputEl.html(totalPrint)
		})
	})
})