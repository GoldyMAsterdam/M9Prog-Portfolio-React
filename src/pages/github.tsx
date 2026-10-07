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

    useEffect(() => {
        YEARS.forEach((y) => loadYear(y).catch(() => {}));
    }, []);

    const loading = !error && data?.year !== year;
    const weeks = data?.calendar.weeks ?? EMPTY_WEEKS;

    return (
    <Shell title="GitHub">
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
