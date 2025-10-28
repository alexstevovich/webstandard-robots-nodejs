# @webstandard/robots

**Canonical URL:**[https://alexstevovich.com/r/webstandard-robots-nodejs](https://alexstevovich.com/r/webstandard-robots-nodejs)

**@webstandard/robots** is a minimal, standards-compliant generator for producing `robots.txt` files in Node.js. It provides clean classes for defining crawler rules, user-agents, crawl delays, and sitemap references, then outputs the canonical `robots.txt` text exactly as search engines expect.

Built to be small, predictable, and future-proof — no dependencies, no magic, just precise control over your site’s crawl zones.

## Installation

```sh

npm  install  @webstandard/robots

```

## Usage

```js
import RobotsTxt from '@webstandard/robots';

// Create a new RobotsTxt instance
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

// Generate the robots.txt output
const generatedOutput = robots.output();

// Expected output for comparison
const expectedOutput = `User-agent: *
Allow: /
Disallow: /private

User-agent: Googlebot
Allow: /
Disallow: /sensitive
Crawl-delay: 5

Sitemap: https://example.com/sitemap.xml`;
*/
```

## Need sitemap.xml?

I provide a package for `sitemap.xml` as well.

[https://alexstevovich.com/r/webstandard-sitemap-nodejs](https://alexstevovich.com/r/webstandard-sitemap-nodejs)

## Ready for priority one clearance?

This package is also mirrored here: [RobotsForce1](https://alexstevovich.com/r/robotsforce1-nodejs)

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
