import Shell from './Shell'
import { useEffect, useState } from 'react';
import { CURRENT_YEAR, loadYear, type ContributionCalendar, type Week } from '../contributions';

const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];
const LEVELS = [0, 1, 2, 5, 9];

function getContributionColor(count:number) {
    if (count === 0) return 'rgb(255 255 255 / 0.11)';
    if (count < 2) return '#0e4429';
    if (count < 5) return '#006d32';
    if (count < 9) return '#26a641';
    return '#39d353';
}

function formatDay(date: string) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function monthOf(week: Week) {
    return new Date(week.contributionDays[0].date).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
}

// empty year to draw while the first request is still out
const EMPTY_WEEKS: Week[] = Array.from({ length: 53 }, (_, w) => ({
    contributionDays: Array.from({ length: 7 }, (_, d) => ({ contributionCount: 0, date: `empty-${w}-${d}` })),
}));

export default function Github() {
    const [year, setYear] = useState(CURRENT_YEAR);
    const [data, setData] = useState<{ year: number; calendar: ContributionCalendar } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let current = true;
        loadYear(year)
            .then((calendar) => current && setData({ year, calendar }))
            .catch((err) => current && setError(err.message));
        return () => { current = false; };
    }, [year, attempt]);

    // fetch the other years in the background so switching is instant
    useEffect(() => {
        YEARS.forEach((y) => loadYear(y).catch(() => {}));
    }, []);

    const loading = !error && data?.year !== year;
    const weeks = data?.calendar.weeks ?? EMPTY_WEEKS;

    return (
    <Shell title="GitHub">
    {/* <svg
    style={{ width: '2em', height: '2em', margin: '0 auto', display: 'block' }}
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg> */}
        <div>
            <a
            href="https://github.com/GoldyMAsterdam" target="_blank" rel="noopener noreferrer"
            className="mx-auto block w-fit rounded-full"
            >
            <img
            src="https://github.com/GoldyMAsterdam.png?size=160"
            width={160}
            height={160}
            draggable={false}
            alt="Github Profile Picture"
            className="rounded-full object-cover pointer-events-none select-none"
            />
            </a>
        </div>
        <div>
            <h1 className="text-xl mt-10 font-bold text-center content-center tabular-nums" aria-live="polite">
                {error ? `Couldn't load ${year}` : data ? `${data.calendar.totalContributions} contributions in ${data.year}` : 'Loading contributions…'}
            </h1>
            <div className="flex flex-row justify-center">
            {YEARS.map((y) => (
                <button
                    key={y}
                    onClick={() => { setError(null); setYear(y); }}
                    aria-pressed={y === year}
                    className={`mx-2 mt-4 rounded-full px-4 py-2 font-mono text-[0.85rem]/[1] tabular-nums transition-colors duration-150 ${
                        y === year ? 'bg-bright text-bg' : 'glass pill text-ink'
                    }`}
                    >
                    {y}
                </button>
            ))}
            </div>
            {error && (
                <p className="mt-6 text-center text-muted">
                    {error}{' '}
                    <button className="text-link underline" onClick={() => { setError(null); setAttempt((a) => a + 1); }}>Try again</button>
                </p>
            )}
            <div className="mx-auto mt-6 max-w-5xl">
                <div
                    className="grid gap-0.5 font-mono text-[0.7rem] text-muted"
                    style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
                    aria-hidden="true"
                >
                    {weeks.map((week, i) => (
                        <span key={i} className="overflow-visible whitespace-nowrap">
                            {data && (i === 0 || monthOf(week) !== monthOf(weeks[i - 1])) ? monthOf(week) : ''}
                        </span>
                    ))}
                </div>
                <div
                    className={`mt-1 grid gap-0.5 transition-opacity ${loading ? 'opacity-50' : ''}`}
                    aria-busy={loading}
                    style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
                >
                    {weeks.map((week, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                        {week.contributionDays.map((day) => (
                        <div
                            key={day.date}
                            title={data ? `${day.date}: ${day.contributionCount}` : undefined}
                            className="group relative aspect-square w-full rounded-sm"
                            style={{ backgroundColor: getContributionColor(day.contributionCount) }}
                        >
                            {data && (
                            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                            {day.contributionCount} contributions on {formatDay(day.date)}
                            </span>
                            )}
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
                <div className="mt-3 flex items-center justify-end gap-1 font-mono text-[0.7rem] text-muted" aria-hidden="true">
                    Less
                    {LEVELS.map((count) => (
                        <span key={count} className="size-3 rounded-sm" style={{ backgroundColor: getContributionColor(count) }} />
                    ))}
                    More
                </div>
            </div>
        </div>
    </Shell>
  )
}
