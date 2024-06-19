export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function numberWord(n: number) {
  const words = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten'
  ];

  return words[n];
}

export function text(str: string): string {
  // Remove all HTML tags, since we don't want to render them
  // and they might contain dangerous content (e.g. <script>)
  const cleanStr = str.replace(/<[^>]*>/g, '');

  const rules = [
    // Bold
    {
      pattern: /(\*\*|__)(.*?)\1/g,
      replacement: '<span class="strong">$2</span>'
    },
    // Italic
    {
      pattern: /(\*|_)(.*?)\1/g,
      replacement: '<span class="em">$2</span>'
    },
    // Paragraph end
    {
      pattern: /\n\n/g,
      replacement: '<br class="paragraph-break" />'
    },
    // Line break
    {
      pattern: /\n/g,
      replacement: '<br />'
    },
    // Tagged: [/dice bar] => <span class="t t--dice">bar<i class="fas fa-dice-three"></i></span>
    {
      pattern: /\[\/dice\s+([^\]]+)\]/g,
      replacement: `<span class="t t--dice">$1<i class="fas fa-dice-three"></i></span>`
    },
    // Tagged: [/foo bar baz] => <span class="t t--foo">bar baz</span>
    {
      pattern: /\[\/(\w+)\s+([^\]]+)\]/g,
      replacement: `<span class="t t--$1">$2</span>`
    }
  ];

  let result = cleanStr;
  rules.forEach((rule) => {
    result = result.replaceAll(rule.pattern, rule.replacement);
  });

  return `<span class="markdown">${result}</span>`;
}
