const axios = require("axios");

const apiUrl = process.env.BUBBLE_API_URL;
const apiKey = process.env.BUBBLE_API_KEY;

const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
};

const createNewProduct = async (req, res) => {

    const productsPayload = req.body.products.map(product => {
        const formattedSpecs = product.specs.map(spec => JSON.stringify({
            key: spec.key,
            value: spec.value
        }));

        return {
            name: product.name,
            category: product.category,
            price: product.price,
            rate: product.rate,
            photo: product.photo,
            specs: formattedSpecs,
            brand: product.brand,
            asin: product.asin,
            amazon_us_url: product.amazon_us_url,
            description: product.description,
            i: 0, // Assume this field is required by Bubble API; adjust as necessary.
            level: 0, // Same as above; adjust if needed.
        }
    });

    console.log(productsPayload);

    try {

        for (const bubblePayload of productsPayload) {

            const response = await axios.post(`${apiUrl}/createNewProduct`, bubblePayload, { headers });
            console.log(`Product ${bubblePayload.name} uploaded successfully: `, response.data);

            // If needed, include a delay between requests to avoid hitting rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
        }


        // Send back the success response from the Bubble API
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating new entry:', error);
        // Check if error response is available from axios, otherwise use error.message
        const errorMessage = error.response ? error.response.data : error.message;
        res.status(500).json({ error: errorMessage });
    }

}

const createNewCategory = async (req, res) => {

    try {
        const response = await axios.post(`${apiUrl}/createNewCategory`, req.body, {
            headers: headers
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating new entry:', error);
        res.status(500).json({ error: 'An error occurred while creating a new entry' });
    }

}

module.exports = {
    createNewProduct,
    createNewCategory,
};