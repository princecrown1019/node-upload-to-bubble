const axios = require("axios");
const FormData = require('form-data');

const apiUrl = process.env.BUBBLE_API_URL;
const apiKey = process.env.BUBBLE_API_KEY;

const headers = {
    'Authorization': `Bearer ${apiKey}`,
};

const createNewProduct = async (req, res) => {

    try {
        const formData = new FormData();

        // Append fields to formData
        formData.append('name', req.body.name);
        formData.append('category', req.body.category);
        formData.append('price', String(req.body.price));
        formData.append('rate', String(req.body.rate));
        // formData.append('photo', req.body.photo);

        // Check and append image files to formData, if they exist in the request
        // if (req.body.photo) {
        //     for (const photo of req.body.photo) {
        //         formData.append('photo', photo);
        //     }
        // } else {
        //     throw new Error('No photo files to upload.');
        // }

        console.log(formData);

        // Get headers from formData to include the Content-Type with boundary parameter
        const formHeaders = formData.getHeaders();

        const response = await axios.post(`${apiUrl}/createNewProduct`, formData, {
            headers: {
                ...headers, // Existing headers (e.g., Authorization)
                ...formHeaders, // Headers from formData, including the Content-Type
            }
        });

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