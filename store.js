$(document).ready(function () {
	
		const outputEl = $("#department-products")
	
		// Create XHR objects (not invoked yet)
		const getCategories = $.ajax({ url: "./categories.json" })
		const getProducts = $.ajax({ url: "./products.json" })
	
		// object to avoid Object.create ;)
		let productCategoryObj = {
			"products": null,
			"category": null,
			"clickedCategory": {
				"id": 75
			}
		}
	
		getProducts.then(
			function (theProducts) {
				productCategoryObj.products = theProducts
				getCategories.then(
					function (theCategories) {
						productCategoryObj.category = theCategories
	
						// event listener for select + update DOM with sale price innerHTML
						$("select[name='discount']").change(function () {
							let selectedText = $(this).find("option:selected").text()
							productCategoryObj.clickedCategory = theCategories.categories.find(c => c.season_discount === selectedText)
	
							outputToDOM()
						})
						// display to DOM
						outputToDOM()
						// })
					})
			}
		)
	
		// display to DOM function
		let outputToDOM = function (output) {
			let finalHTML = ""
			productCategoryObj.products.products.forEach(product => {
				const productCategory = productCategoryObj.category.categories.find(current => current.id === product.category_id)
	
				finalHTML += `
					<section>
						<p>Product: ${product.name}</p>
						<p>Category: ${productCategory.name}</p>
						<p>Price: $${product.price}</p>
				`
				// on click, determines if category and product ids match the clicked season and appends the sale price
				if (product.category_id === productCategoryObj.clickedCategory.id) {
					finalHTML += `<p style="color:red">Sale Price: ${(product.price - productCategory.discount).toFixed(2)}</p>`
																
				}
				finalHTML += "</section><br>"
	
				outputEl.html(finalHTML)
			})
		}
	})