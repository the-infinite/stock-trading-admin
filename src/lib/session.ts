import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";
import type { UserModel } from "./types/user";

/**
 * The database selection of all USERS that are currently logged into this dashboard right now.
 */
export const usersStore: Writable<UserModel[] | undefined> = localStorageStore('user', (undefined as unknown as UserModel[]));

/**
 * The user that has been selected and the currently active user.
 */
export const selectedUser: Writable<number> = localStorageStore('activeUser', 1);