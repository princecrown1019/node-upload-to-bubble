const axios = require("axios");
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;


const createNewProduct = async (req, res) => {
    console.log(`${apiUrl}/create_product`);
    try {
        const response = await axios.post(`${apiUrl}/create_product`, req.body, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating new entry:', error);
        res.status(500).json({ error: 'An error occurred while creating a new entry' });
    }

}

module.exports = {
    createNewProduct,
};