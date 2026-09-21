import Shell from './Shell'
import { useEffect, useState } from 'react';

type ContributionDay = { contributionCount: number; date: string };
type Week = { contributionDays: ContributionDay[] };
type ContributionCalendar = { totalContributions: number; weeks: Week[] };

export default function Github() {
    const [data, setData] = useState<ContributionCalendar | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        fetch('/api/github')
        .then(async (res) => {
            const body = await res.json();
            if (!res.ok) throw new Error(body.error ?? `GitHub API returned ${res.status}`);
            return body;
        })
        .then(setData)
        .catch((err) => setError(err.message));
    }, []);

    if (error) return <div>Something went wrong {error}</div>;
    if (!data) return<div>Loading...</div>;

    return (
    <Shell title="GitHub">
        <div>
            <h1 className="text-xl font-bold">{data.totalContributions} contributions this year</h1>
            <div className="flex gap-0.5 mt-4">
                {data.weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                    {week.contributionDays.map((day) => (
                    <div
                        key={day.date}
                        title={`${day.date}: ${day.contributionCount}`}
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ background: day.contributionCount > 0 ? '#39d353' : '#161b22' }}
                    />
                    ))}
                </div>
                ))}
            </div>
            </div>
    </Shell>
  )
}
