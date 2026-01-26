import './theme/style.css';

import ReactMarkdown from 'react-markdown';

import { Code } from '../Code';

const README_THEME = {
  light: 'markdown-body-light',
  dark: 'markdown-body-dark',
} as const;

type MarkdownProps = {
  md: string;
  darkMode: boolean;
};

export function Markdown({ md, darkMode }: MarkdownProps) {
  const theme = darkMode ? 'dark' : 'light';
  const mainTheme = README_THEME[theme];
  const markdownClassName = `markdown-body ${mainTheme}`;

  return (
    <ReactMarkdown
      className={markdownClassName}
      components={{ code: props => <Code {...props} darkMode={darkMode} /> }}
    >
      {md}
    </ReactMarkdown>
  );
}
