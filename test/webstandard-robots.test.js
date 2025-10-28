import { describe, it, expect } from 'vitest';
import WebStandardRobots from '../src/index.js'; // Adjust import path as needed

describe('RobotsTxt API Complex Example', () => {
    it('should generate the correct robots.txt output with multiple agents, rules, and sitemaps', () => {
        const robots = new WebStandardRobots.RobotsTxt();

        // First agent * (default for all)
        const group1 = new WebStandardRobots.Group('*');
        group1.addAllow('/').addDisallow('/private');
        robots.addGroup(group1);

        // Second agent Googlebot with custom rules
        const group2 = new WebStandardRobots.Group('Googlebot');
        group2.addAllow('/').addDisallow('/sensitive').addCrawlDelay(5);
        robots.addGroup(group2);

        // Add a sitemap
        robots.addSitemap('https://example.com/sitemap.xml');

        // Updated expected output with the new format: blank lines between groups and before the sitemap
        const expectedOutput = `User-agent: *
Allow: /
Disallow: /private

User-agent: Googlebot
Allow: /
Disallow: /sensitive
Crawl-delay: 5

Sitemap: https://example.com/sitemap.xml`;

        // Normalize the output by stripping newlines and spaces
        const normalizeOutput = (str) => str.replace(/\r\n/g, '\n').trim(); // Convert to Unix-style newlines and remove trailing spaces
        console.log('Generated Output:\n', robots.output());
        //console.log("Expected Output:\n", expectedOutput);

        // Compare normalized output
        expect(normalizeOutput(robots.output())).toBe(
            normalizeOutput(expectedOutput),
        );
    });
});
