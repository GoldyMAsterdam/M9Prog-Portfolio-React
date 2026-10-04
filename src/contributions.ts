// GitHub contribution data, shared by the GitHub page and the about skyline
export type ContributionDay = { contributionCount: number; date: string };
export type Week = { contributionDays: ContributionDay[] };
export type ContributionCalendar = { totalContributions: number; weeks: Week[] };

export const CURRENT_YEAR = new Date().getFullYear();

// lives outside the component so it survives leaving and coming back to the page
const requests: Record<number, Promise<ContributionCalendar>> = {};

export function loadYear(year: number) {
    return (requests[year] ??= fetch(`/api/github?year=${year}`)
        .then(async (res) => {
            const text = await res.text();
            if (!res.ok) {
                throw new Error(`Github API returned ${res.status}: ${text.slice(0, 200)}`);
            }
            try {
                return JSON.parse(text) as ContributionCalendar;
            } catch {
                throw new Error(`Expected JSON from Github API, received: ${text.slice(0, 200)}`);
            }
        })
        .catch((err) => {
            delete requests[year]; // so a retry fetches again
            throw err;
        }));
}

// start fetching the current year as soon as the app loads, not when the page opens
loadYear(CURRENT_YEAR).catch(() => {});
