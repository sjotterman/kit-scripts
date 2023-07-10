import '@johnlindquist/kit';
import _ from 'lodash';

// Menu: Open Chrome Bookmark
// Description: List Chrome Bookmarks and open tabs. Then open tab.
// Author: kyo young
// shortcut: cmd shift k
// name: url-open

let rawBookmarks = await readFile(
  home('Library/Application Support/Google/Chrome/Default/Bookmarks'),
  'utf8'
);

let currentTabs = await getTabs();

const parsedBookmarks = JSON.parse(rawBookmarks);
const bookmarkStructure = parsedBookmarks.roots.bookmark_bar.children;

const bookmarks = (function flatten(bookmarkElements) {
  return bookmarkElements.reduce((acc, cur) => {
    if (cur.type === 'folder') {
      return [...acc, ...flatten(cur.children)];
    }

    return [...acc, cur];
  }, []);
})(bookmarkStructure);

let bookmarkChoices = bookmarks.map(({ name, url }) => {
  return {
    name: name,
    description: url,
    value: url,
  };
});

let currentOpenChoices = currentTabs.map(({ url, title }) => ({
  name: url,
  value: url,
  description: title,
}));

let bookmarksAndOpen = [...bookmarkChoices, ...currentOpenChoices];

let choices = _.uniqBy(bookmarksAndOpen, 'name');

let url = await arg('Open Chrome tab:', choices);

focusTab(url);
