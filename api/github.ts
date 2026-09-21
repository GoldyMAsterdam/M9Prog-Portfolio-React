import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    res.status(500).json({ error: 'GITHUB_TOKEN is not configured' });
    return;
  }

  const query = `
    query($userName: String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { userName: 'GoldyMAsterdam' },
    }),
  });

  if (!response.ok) {
    res.status(response.status === 401 ? 502 : response.status).json({
      error: response.status === 401 ? 'GITHUB_TOKEN was rejected by GitHub' : 'GitHub request failed',
    });
    return;
  }

  const data = await response.json();
  const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    res.status(502).json({ error: 'GitHub returned no contribution calendar' });
    return;
  }

  res.status(200).json(calendar);
}