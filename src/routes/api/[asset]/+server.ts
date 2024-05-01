import { TWELVE_DATA_API_KEY } from '$env/static/private';
import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
    try {
        const response = await event.fetch(`https://api.twelvedata.com/price?symbol=${event.params.asset}&apikey=${TWELVE_DATA_API_KEY}`);

        // If we fetch this one.
        if (response.ok) {
            const data = await response.json();

            // Return a JSON 
            return json({
                price: parseFloat(data.price.toString())
            });
        }

        // This is the text to return here.
        return text(`Unable to fetch data for the asset ${event.params.asset}`, {
            status: 500,
        });
    } catch (e) {
        return text(`Unable to fetch data for the asset ${event.params.asset}`, {
            status: 500,
        });
    }
};