import type { PageServerLoad } from './$types';
import { schedulesCollection } from '$lib/server';
import type { ScheduleModel } from '$lib/types/schedule';

export const load = (async () => {
    const schedules: ScheduleModel[] = [];

    (await schedulesCollection.get()).forEach(result => {

    });

    return {
        schedules: schedules
    };
}) satisfies PageServerLoad;