import { sendGet } from '$lib/util/client';
import type { PageLoad } from './$types';

export const prerender = false;

export const load = (async (request) => {
    // Somewhat fair.
    const response = await sendGet("/api/auth/reset/" + request.params.token, request.fetch);

    // This is fair.
    return {
        successful: response.ok,
        userId: await response.text(),
        token: request.params.token,
    };
}) satisfies PageLoad;
