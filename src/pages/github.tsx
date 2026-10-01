import Shell from './Shell'
import { useEffect, useState, useRef } from 'react';

type ContributionDay = { contributionCount: number; date: string };
type Week = { contributionDays: ContributionDay[] };
type ContributionCalendar = { totalContributions: number; weeks: Week[] };

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

export default function Github() {
    const [data, setData] = useState<ContributionCalendar | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const [year, setYear] = useState(2026);
    const years = [2026, 2025, 2024];

    const [loading, setLoading] = useState(false);

    const cache = useRef<Record<number, ContributionCalendar>>({});

    useEffect(() => {
        const cached = cache.current[year];
         if (cached) {
            setData(cached);
            return;
        }
        setLoading(true);
        fetch(`/api/github?year=${year}`)
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
        .then((result) => {
            cache.current[year] = result;
            setData(result);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, [year]);

    if (error) return <div>Something went wrong {error}</div>;
    if (!data) return<div>Loading...</div>;

    return (
    <Shell title="GitHub">
        <div>
            <img
            src="https://github.com/GoldyMAsterdam.png?size=160"
            alt="Github Profile Picture"
            className="mx-auto block rounded-full object-cover"
            />
        </div>
        <div>
            <h1 className="text-xl mt-10 font-bold text-center content-center">{data.totalContributions} contributions in {year}</h1>
            <div className="flex flex-row justify-center">
            {years.map((y) => (
                <button
                    key={y}
                    onClick={() => setYear(y)}
                    className="pill mx-2 mt-4 rounded-full bg-bright px-4 py-2 font-mono text-[0.85rem]/[1] text-bg transition-colors duration-150 active:bg-link"
                    >
                    {y}
                </button>
            ))}
            </div>
            <div
                className={`mx-auto mt-4 grid max-w-5xl gap-0.5 transition-opacity ${loading ? 'opacity-50' : ''}`}
                aria-busy={loading}
                style={{ gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))` }}
            >
                {data.weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                    {week.contributionDays.map((day) => (
                    <div
                        key={day.date}
                        title={`${day.date}: ${day.contributionCount}`}
                        className="group relative aspect-square w-full rounded-sm"
                        style={{ backgroundColor: getContributionColor(day.contributionCount) }}
                    >
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {day.contributionCount} contributions on {formatDay(day.date)}
                        </span>
                    </div>
                    ))}
                </div>
                ))}
            </div>
            </div>
    </Shell>
  )
}
