import React from 'react';
import readmeText from '../../README.md?raw';

export default function Readme() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <pre className="whitespace-pre-wrap">{readmeText}</pre>
    </div>
  );
}
