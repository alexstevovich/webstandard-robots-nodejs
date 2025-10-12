import { describe, it, expect } from 'vitest';
import RobotsTxt from '../src/index.js';
import fs from 'fs/promises';

describe('RobotsTxt (Example Output Validation)', () => {
    it('Generates expected robots.txt output from example', async () => {
        const robots = new RobotsTxt();

        // ✅ Define user-agent rules
        robots.agent('*').allow('/').disallow('/private');

        robots.agent('Googlebot').allow('/').disallow('/sensitive').delay(5);

        // ✅ Add sitemap
        robots.sitemap('https://example.com/sitemap.xml');

        // ✅ Generate expected output
        const generated = robots.output();
        const expected = `User-agent: *\nAllow: /\nDisallow: /private\n\nUser-agent: Googlebot\nAllow: /\nDisallow: /sensitive\nCrawl-delay: 5\n\nSitemap: https://example.com/sitemap.xml`;

        // ✅ Validate robots.txt content
        expect(generated.trim()).toBe(expected.trim());
    });
});
