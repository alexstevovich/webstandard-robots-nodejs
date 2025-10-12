# @webstandard/robots

**Canonical URL:**[https://alexstevovich.com/r/webstandard-robots-nodejs](https://alexstevovich.com/r/webstandard-robots-nodejs)

**@webstandard/robots** is a minimal, standards-compliant generator for producing `robots.txt` files in Node.js. It provides a clean, fluent API for defining crawler rules, user-agents, crawl delays, and sitemap references, then outputs the canonical `robots.txt` text exactly as search engines expect.

Built to be small, predictable, and future-proof — no dependencies, no magic, just precise control over your site’s crawl zones.


## Installation

```sh

npm  install  @webstandard/robots

```

## Usage

```js
import RobotsTxt from '@webstandard/robots';

const robots = new RobotsTxt();
robots.agent('*').allow('/').disallow('/private');
robots.agent('Googlebot').allow('/').disallow('/sensitive').delay(5);
robots.sitemap('https://example.com/sitemap.xml');
console.log(robots.output());

/**
User-agent: *
Allow: /
Disallow: /private
User-agent: Googlebot
Allow: /
Disallow: /sensitive
Crawl-delay: 5
Sitemap: https://example.com/sitemap.xml
*/
```

## Need sitemap.xml?

I provide a package for `sitemap.xml` as well.

[https://alexstevovich.com/r/webstandard-sitemap-nodejs](https://alexstevovich.com/r/webstandard-sitemap-nodejs)

## Ready for priority one clearance?

This package is also mirrored here: [RobotsForce1](https://alexstevovich.com/r/robotsforce1-nodejs)

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
