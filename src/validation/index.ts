

    /**
     * Validate a product object.
     * @param {Object} product
     * @prop {string} title - The product title.
     * @prop {string} description - The product description.
     * @prop {string} imageURL - The product image URL.
     * @prop {string} price - The product price.
     * @returns {Object} an object with error messages for each of the product properties.
     */
export const productValidation = (product : { title: string; description: string; imageURL: string; price: string})=> {
    const errors : {title: string; description: string; imageURL: string; price: string; colors: string, category: string} = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: "",
        category: ""
    }

    const validURL = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;

    if(!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = "Title must be between 10 and 80 characters.";
    }
    if(!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = "Description must be between 20 and 500 characters.";
    }
    if(!product.imageURL.trim() || !validURL) {
        errors.imageURL = "Image URL must be a valid URL.";
    }
    if(!product.price.trim()|| isNaN(Number(product.price))) {
        errors.price = "Price must be a valid number.";
    }
    return errors;
}