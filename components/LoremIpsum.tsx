import React, { useState, useEffect } from 'react';
import { ThemedText } from './ThemedText';

interface LoremIpsumProps {
  paragraphs: number;
}

const LoremIpsumGenerator: React.FC<LoremIpsumProps> = ({
  paragraphs,
}) => {
  const [loremIpsum, setLoremIpsum] = useState<string[]>([]);

  useEffect(() => {
    generateLoremIpsum();
  }, [paragraphs]);

  const generateLoremIpsum = () => {
    const words = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
      'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    ];

    const minWordsPerParagraph = 15;
    const maxWordsPerParagraph = 40;

    const generatedParagraphs: string[] = [];

    for (let i = 0; i < paragraphs; i++) {
      const paragraphLength = Math.floor(Math.random() * (maxWordsPerParagraph - minWordsPerParagraph + 1)) + minWordsPerParagraph;
      let paragraph = '';

      for (let j = 0; j < paragraphLength; j++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        paragraph += (j === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord) + ' ';
      }

      generatedParagraphs.push(paragraph.trim());
    }

    setLoremIpsum(generatedParagraphs);
  };

  return (
    <>
      {loremIpsum.map((paragraph, index) => (
        <ThemedText key={index}>{paragraph}</ThemedText>
      ))}
    </>
  );
};

export default LoremIpsumGenerator;
