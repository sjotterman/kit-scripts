// Name: github-prs

import '@johnlindquist/kit';

// why do I have to define the path?
const result = await $` /opt/homebrew/bin/gh search prs \
  --repo capabuild/capabuild \
  --state open \
  --review-requested cket \
  --json author,body,id,isDraft,isPullRequest,number,title,updatedAt,assignees,labels,state,url,commentsCount \
  --review required
`;

export interface PR {
  assignees: any[];
  author: Author;
  body: string;
  commentsCount: number;
  id: string;
  isDraft: boolean;
  isPullRequest: boolean;
  labels: any[];
  number: number;
  state: string;
  title: string;
  updatedAt: Date;
  url: string;
}

export interface Author {
  id: string;
  is_bot: boolean;
  login: string;
  type: string;
  url: string;
}

let prs: PR[];
try {
  prs = JSON.parse(result.stdout);
} catch (error) {
  div(
    md(`## Error
  `)
  );
  dev({ error });
  await $`exit 1`;
}
dev({ prs });

const formattedPRs = prs.map((pr) => {
  return {
    name: `${pr.title} - ${pr.author.login} - ${pr.commentsCount} comment(s)`,
    description: `${pr.body}`,
    // add any properties to "value"
    value: pr,
  };
});

const choice = await arg('Select a pr', formattedPRs);
await $`open ${choice.url}`;
