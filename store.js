$(document).ready(function () {
    const outputEl = $(".product-listing")
    // you are requesting access to these files here, so you can use them as you go. 
    $.ajax({
        "url": "products.json",
        "method": "GET"
        // all the products.json is nested with in productData.
    }).then(productData => {
        
        const products = productData.products 

        let saleInfo = "<section id='saleContainer'>"
        
        $.ajax({
            "url": "categories.json",
            "method": "GET"
        }).then (categoryData => {
            let totalPrint = ""

            const categories = categoryData.categories
            products.forEach(sale => {
                const productCategory = categories.find(current => current.id === product.category_id)
                totalPrint += `
                <article id="product_${product.id}>
                    <p>Name: ${product.name}</p>
                    <p>Category: ${productCategory.name}</p>
                    <p>Price: ${product.price}</p>
                </article>
            `  
            })
            outputEl.html(totalPrint)
        })
    })
})