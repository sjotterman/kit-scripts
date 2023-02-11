// Name: Github Notifications
// Description: Browse, preview and open your GitHub notifications
// Author: TAKANOME DEV
// Twitter: @takanome_dev
// Github:

import "@johnlindquist/kit"

const { Octokit }: typeof import("octokit") = await npm("octokit")
import { Endpoints } from "@octokit/types"

type Notification = Endpoints["GET /notifications"]["response"]["data"][number]
type IssueComment = Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"]["response"]["data"][number]


const prIcon = `<svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.27987 2.6889L8.37637 0.592404C8.40696 0.561732 8.44597 0.540835 8.48846 0.532362C8.53094 0.523889 8.57499 0.528222 8.61501 0.544811C8.65503 0.561399 8.68922 0.589498 8.71325 0.625543C8.73728 0.661588 8.75007 0.703957 8.74999 0.747279V4.94028C8.75007 4.9836 8.73728 5.02597 8.71325 5.06201C8.68922 5.09806 8.65503 5.12616 8.61501 5.14275C8.57499 5.15934 8.53094 5.16367 8.48846 5.1552C8.44597 5.14672 8.40696 5.12583 8.37637 5.09515L6.27987 2.99865C6.2595 2.97833 6.24334 2.95419 6.23231 2.92762C6.22128 2.90104 6.2156 2.87255 6.2156 2.84378C6.2156 2.81501 6.22128 2.78651 6.23231 2.75994C6.24334 2.73336 6.2595 2.70922 6.27987 2.6889ZM3.28124 2.18753C3.1072 2.18753 2.94028 2.25667 2.81721 2.37974C2.69413 2.50281 2.62499 2.66973 2.62499 2.84378C2.62499 3.01783 2.69413 3.18475 2.81721 3.30782C2.94028 3.43089 3.1072 3.50003 3.28124 3.50003C3.45529 3.50003 3.62221 3.43089 3.74528 3.30782C3.86835 3.18475 3.93749 3.01783 3.93749 2.84378C3.93749 2.66973 3.86835 2.50281 3.74528 2.37974C3.62221 2.25667 3.45529 2.18753 3.28124 2.18753ZM1.31249 2.84378C1.3126 2.48287 1.41192 2.12893 1.59959 1.82065C1.78725 1.51237 2.05605 1.26161 2.3766 1.09577C2.69716 0.929935 3.05713 0.855403 3.41718 0.880322C3.77722 0.905241 4.12349 1.02865 4.41815 1.23707C4.7128 1.44548 4.94449 1.73088 5.0879 2.06208C5.23131 2.39327 5.28092 2.75751 5.23131 3.115C5.18169 3.47248 5.03477 3.80945 4.80659 4.08908C4.57842 4.3687 4.27776 4.58023 3.93749 4.70053V9.29953C4.3756 9.45434 4.74486 9.75906 4.98001 10.1598C5.21517 10.5606 5.30107 11.0316 5.22253 11.4895C5.14399 11.9475 4.90607 12.3629 4.55083 12.6625C4.19559 12.962 3.7459 13.1262 3.28124 13.1262C2.81659 13.1262 2.3669 12.962 2.01166 12.6625C1.65641 12.3629 1.4185 11.9475 1.33996 11.4895C1.26142 11.0316 1.34732 10.5606 1.58247 10.1598C1.81763 9.75906 2.18689 9.45434 2.62499 9.29953V4.70053C2.24106 4.56479 1.90866 4.31332 1.67359 3.98079C1.43853 3.64825 1.31237 3.25101 1.31249 2.84378ZM9.62499 2.18753H8.74999V3.50003H9.62499C9.85706 3.50003 10.0796 3.59222 10.2437 3.75631C10.4078 3.9204 10.5 4.14296 10.5 4.37503V9.29953C10.0619 9.45434 9.69263 9.75906 9.45747 10.1598C9.22232 10.5606 9.13642 11.0316 9.21496 11.4895C9.2935 11.9475 9.53141 12.3629 9.88666 12.6625C10.2419 12.962 10.6916 13.1262 11.1562 13.1262C11.6209 13.1262 12.0706 12.962 12.4258 12.6625C12.7811 12.3629 13.019 11.9475 13.0975 11.4895C13.1761 11.0316 13.0902 10.5606 12.855 10.1598C12.6199 9.75906 12.2506 9.45434 11.8125 9.29953V4.37503C11.8125 3.79487 11.582 3.23847 11.1718 2.82823C10.7616 2.418 10.2052 2.18753 9.62499 2.18753ZM10.5 11.1563C10.5 10.9822 10.5691 10.8153 10.6922 10.6922C10.8153 10.5692 10.9822 10.5 11.1562 10.5C11.3303 10.5 11.4972 10.5692 11.6203 10.6922C11.7434 10.8153 11.8125 10.9822 11.8125 11.1563C11.8125 11.3303 11.7434 11.4972 11.6203 11.6203C11.4972 11.7434 11.3303 11.8125 11.1562 11.8125C10.9822 11.8125 10.8153 11.7434 10.6922 11.6203C10.5691 11.4972 10.5 11.3303 10.5 11.1563ZM3.28124 10.5C3.1072 10.5 2.94028 10.5692 2.81721 10.6922C2.69413 10.8153 2.62499 10.9822 2.62499 11.1563C2.62499 11.3303 2.69413 11.4972 2.81721 11.6203C2.94028 11.7434 3.1072 11.8125 3.28124 11.8125C3.45529 11.8125 3.62221 11.7434 3.74528 11.6203C3.86835 11.4972 3.93749 11.3303 3.93749 11.1563C3.93749 10.9822 3.86835 10.8153 3.74528 10.6922C3.62221 10.5692 3.45529 10.5 3.28124 10.5Z" fill="#3D9A50"/>
</svg>
`
const chatIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13V15C12 15.2652 11.8946 15.5196 11.7071 15.7071C11.5196 15.8946 11.2652 16 11 16H4L1 19V9C1 8.73478 1.10536 8.48043 1.29289 8.29289C1.48043 8.10536 1.73478 8 2 8H4M19 12L16 9H9C8.73478 9 8.48043 8.89464 8.29289 8.70711C8.10536 8.51957 8 8.26522 8 8V2C8 1.73478 8.10536 1.48043 8.29289 1.29289C8.48043 1.10536 8.73478 1 9 1H18C18.2652 1 18.5196 1.10536 18.7071 1.29289C18.8946 1.48043 19 1.73478 19 2V12Z" stroke="#889096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
const commitIcon = `<svg width="20" height="20" viewBox="0 0 8 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 13C3.20435 13 2.44129 12.6839 1.87868 12.1213C1.31607 11.5587 1 10.7956 1 10C1 9.20435 1.31607 8.44129 1.87868 7.87868C2.44129 7.31607 3.20435 7 4 7M4 13C4.79565 13 5.55871 12.6839 6.12132 12.1213C6.68393 11.5587 7 10.7956 7 10C7 9.20435 6.68393 8.44129 6.12132 7.87868C5.55871 7.31607 4.79565 7 4 7M4 13V19M4 7V1" stroke="#3D9A50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
const openIssuePrIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 10C9 10.2652 9.10536 10.5196 9.29289 10.7071C9.48043 10.8946 9.73478 11 10 11C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9C9.73478 9 9.48043 9.10536 9.29289 9.29289C9.10536 9.48043 9 9.73478 9 10ZM1 10C1 11.1819 1.23279 12.3522 1.68508 13.4442C2.13738 14.5361 2.80031 15.5282 3.63604 16.364C4.47177 17.1997 5.46392 17.8626 6.55585 18.3149C7.64778 18.7672 8.8181 19 10 19C11.1819 19 12.3522 18.7672 13.4442 18.3149C14.5361 17.8626 15.5282 17.1997 16.364 16.364C17.1997 15.5282 17.8626 14.5361 18.3149 13.4442C18.7672 12.3522 19 11.1819 19 10C19 8.8181 18.7672 7.64778 18.3149 6.55585C17.8626 5.46392 17.1997 4.47177 16.364 3.63604C15.5282 2.80031 14.5361 2.13738 13.4442 1.68508C12.3522 1.23279 11.1819 1 10 1C8.8181 1 7.64778 1.23279 6.55585 1.68508C5.46392 2.13738 4.47177 2.80031 3.63604 3.63604C2.80031 4.47177 2.13738 5.46392 1.68508 6.55585C1.23279 7.64778 1 8.8181 1 10Z" stroke="#3D9A50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
const releaseIcon = `<svg width="20" height="20" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 5.5C4.5 5.76522 4.60536 6.01957 4.79289 6.20711C4.98043 6.39464 5.23478 6.5 5.5 6.5C5.76522 6.5 6.01957 6.39464 6.20711 6.20711C6.39464 6.01957 6.5 5.76522 6.5 5.5C6.5 5.23478 6.39464 4.98043 6.20711 4.79289C6.01957 4.60536 5.76522 4.5 5.5 4.5C5.23478 4.5 4.98043 4.60536 4.79289 4.79289C4.60536 4.98043 4.5 5.23478 4.5 5.5ZM1 4V7.859C1 8.396 1.213 8.911 1.593 9.291L9.709 17.407C9.89704 17.5951 10.1203 17.7443 10.366 17.846C10.6117 17.9478 10.875 18.0002 11.141 18.0002C11.407 18.0002 11.6703 17.9478 11.916 17.846C12.1617 17.7443 12.385 17.5951 12.573 17.407L17.407 12.573C17.5951 12.385 17.7443 12.1617 17.846 11.916C17.9478 11.6703 18.0002 11.407 18.0002 11.141C18.0002 10.875 17.9478 10.6117 17.846 10.366C17.7443 10.1203 17.5951 9.89704 17.407 9.709L9.29 1.593C8.91044 1.2135 8.39574 1.00021 7.859 1H4C3.20435 1 2.44129 1.31607 1.87868 1.87868C1.31607 2.44129 1 3.20435 1 4Z" stroke="#889096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const AUTH_TOKEN = await env("GH_CLASSIC_TOKEN", {
  hint: md(`
    Create a [personal access token](https://github.com/settings/tokens) with the \`notifications\` scope.
  `),
  ignoreBlur: true,
  secret: true,
});

const octokit = new Octokit({
  auth: AUTH_TOKEN,
})

const formattedDate = (date: string) => {
  const d = new Date(date)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

const renderIcon = (type: string) => {
  switch (type) {
    case 'PullRequest':
      return prIcon
    case 'Issue':
      return openIssuePrIcon
    case 'Commit':
      return commitIcon
    case 'Discussion':
      return chatIcon
    case 'Release':
      return releaseIcon
    default:
      return '' 
  }
}

const authorAssociationEmoji = (authorAssociation: string) => {
  switch (authorAssociation) {
    case 'OWNER':
      return '👑'
    case 'COLLABORATOR':
      return '👨‍👩‍👧‍👦'
    case 'CONTRIBUTOR':
      return '👨‍💻'
    case 'FIRST_TIMER':
      return '👶'
    case 'FIRST_TIME_CONTRIBUTOR':
      return '👶'
    case 'MANNEQUIN':
      return '🤖'
    case 'MEMBER':
      return '👪'
    default:
      return ''
  }
}

const getUrl = (notification: Notification): string => {
  switch (notification.subject.type) {
    case "Discussion":
      return `${notification.repository.html_url}/discussions`
    case "Release":
      return `${notification.repository.html_url}/releases/tag/${notification.subject.title}`
    case "Issue":
      return `${notification.repository.html_url}/issues/${notification.subject.url?.split('/').pop()}`
    case "PullRequest":
      return `${notification.repository.html_url}/pull/${notification.subject.url?.split('/').pop()}`
  }
}

const notificationReason = await arg(
  'Choose a notification reason:',
  [
    { name: '🛎 All', value: 'all', description: 'All notifications' },
    { name: '🤹 Assign', value: 'assign', description: 'You were assigned to the thread' },
    { name: '👨‍💻 Author', value: 'author', description: 'You created the thread' },
    { name: '💬 Comment', value: 'comment', description: 'You commented on the thread' },
    { name: '📨 Invitation', value: 'invitation', description: 'You were invited to a repository' },
    { name: '👨‍🏫 Manual', value: 'manual', description: 'You are watching the repository' },
    { name: '👋 Mention', value: 'mention', description: 'You were @mentioned in the thread' },
    { name: '👀 Review Requested', value: 'review_requested', description: 'You were requested to review a pull request' },
    { name: '🚨 Security Alert', value: 'security_alert', description: 'A security alert was published' },
    { name: '🔁 State Change', value: 'state_change', description: 'The thread was marked as read' },
    { name: '👍 Subscribed', value: 'subscribed', description: 'You are subscribed to the thread' },
    { name: '👨‍👩‍👧‍👦 Team Mention', value: 'team_mention', description: 'You were @mentioned in the thread' },
  ])

const notifications = await octokit.paginate("GET /notifications")

const notifs = await arg(
  "Search through notifications...",
  notifications.filter((n) => {
    if (notificationReason === 'all') {
      return true
    }
    return n.reason === notificationReason
  }).map((n) => {

    return {
      // TODO: render icon in front of name
      name: n.repository.full_name,
      value: getUrl(n),
      description: `${n.last_read_at ? '' : '🔔'} ${n.subject.title} - _${formattedDate(n.updated_at)}_`,
      icon: n.repository.owner.avatar_url,
      preview: async () => {
        const response = await octokit.paginate<IssueComment>("Get /repos/{owner}/{repo}/issues/{issue_number}/comments", {
          owner: n.repository.owner.login,
          repo: n.repository.name,
          issue_number: n.subject.url.split('/').pop(),
        })

        const comments = response.map((comment) => {
          return `## @${comment.user.login} - ${formattedDate(comment.updated_at)} ${comment.updated_at === comment.created_at ? '' : '🔁'} ${comment.author_association ? `- ${comment.author_association}` : ''} ${authorAssociationEmoji(comment.author_association)} \n\n ${comment.body}`
        }).join('\n\n')

        return md(`<h1 style="display:flex;gap:5px;align-items:center;">${renderIcon(n.subject.type)} ${n.subject.title}</h1> \n\n ${comments}`)
      }
    };
  })
);

browse(notifs);