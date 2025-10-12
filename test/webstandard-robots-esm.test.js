import { describe, it, expect } from 'vitest';
import RobotsTxt from '../src/index.js';

describe('RobotsTxt (ESM) Tests', () => {
    it('Generates correct robots.txt output', () => {
        const robots = new RobotsTxt();

        // ✅ Define user-agent rules
        robots.agent('*').allow('/').disallow('/private').disallow('/secret');

        // ✅ Add multiple sitemaps
        robots.sitemap('https://example.com/sitemap.xml');
        robots.sitemap('https://example.com/blog-sitemap.xml');

        // ✅ Generate robots.txt output
        const generated = robots.output();
        const expected = `User-agent: *\nAllow: /\nDisallow: /private\nDisallow: /secret\n\nSitemap: https://example.com/sitemap.xml\nSitemap: https://example.com/blog-sitemap.xml`;

        // ✅ Compare output with expected result
        expect(generated.trim()).toBe(expected.trim());
    });
});
