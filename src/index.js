/*
 * @webstandard/robots
 * https://alexstevovich.com/r/webstandard-robots-nodejs
 *
 * ~ Define the crawl zones. Control the AO.
 *
 * Copyright 2015–2025 Alex Stevovich
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default class RobotsTxt {
    /**
     * Creates a new `RobotsTxt` instance.
     */
    constructor() {
        /** @type {Map<string, RobotsTxtUserAgent>} Holds user-agent rules */
        this.userAgents = new Map();

        /** @type {Set<string>} Holds sitemap URLs */
        this.sitemaps = new Set();
    }

    /**
     * Adds a sitemap URL entry.
     * @param {string} url - The URL of the sitemap.
     * @returns {this} Returns the current instance for method chaining.
     */
    sitemap(url) {
        this.sitemaps.add(`Sitemap: ${url}`);

        return this;
    }

    /**
     * Retrieves or creates a user-agent entry.
     * @param {string} name - The user-agent name (e.g., `Googlebot`, `*`).
     * @returns {RobotsTxtUserAgent} Returns an instance of `RobotsTxtUserAgent` for chaining.
     */
    agent(name) {
        if (!this.userAgents.has(name)) {
            this.userAgents.set(name, new RobotsTxtUserAgent(name));
        }

        return this.userAgents.get(name);
    }

    /**
     * Generates the `robots.txt` content.
     * @param {Object} [options] - Options for generating the output.
     * @param {boolean} [options.force=false] - If `true`, generates output even if no agents are defined.
     * @returns {string} The generated `robots.txt` content.
     * @throws {Error} If no user-agent is defined and `force` is not `true`.
     */
    output(options = { force: false }) {
        if (this.userAgents.size === 0 && !options.force) {
            throw new Error(
                `No User-agent defined in robots.txt. Add one with:\n\n` +
                    `    robots.agent('*').allow('/');\n` +
                    `\nOr use { force: true } to suppress this error.`,
            );
        }

        let output = '';
        for (const agent of this.userAgents.values()) {
            output += agent.output() + '\n\n';
        }
        output += [...this.sitemaps].join('\n');

        return output.trim();
    }
}

/**
 * Represents rules for a specific user-agent in `robots.txt`.
 */
export class RobotsTxtUserAgent {
    /**
     * Creates a new user-agent entry.
     * @param {string} name - The name of the user-agent (e.g., `Googlebot`, `*`).
     */
    constructor(name) {
        /** @type {string} The name of the user-agent. */
        this.name = name;

        /** @type {string[]} Stores allow/disallow rules and directives. */
        this.rules = [];
    }

    /**
     * Allows access to a path.
     * @param {string} path - The path to allow.
     * @returns {this} Returns the current instance for method chaining.
     */
    allow(path) {
        this.rules.push(`Allow: ${path}`);

        return this;
    }

    /**
     * Disallows access to a path.
     * @param {string} path - The path to disallow.
     * @returns {this} Returns the current instance for method chaining.
     */
    disallow(path) {
        this.rules.push(`Disallow: ${path}`);

        return this;
    }

    /**
     * Sets a crawl delay for the user-agent.
     * @param {number} seconds - The delay time in seconds.
     * @returns {this} Returns the current instance for method chaining.
     */
    delay(seconds) {
        this.rules.push(`Crawl-delay: ${seconds}`);

        return this;
    }

    /**
     * Generates the `robots.txt` rules for this user-agent.
     * @returns {string} The formatted `robots.txt` user-agent block.
     */
    output() {
        return `User-agent: ${this.name}\n` + this.rules.join('\n');
    }
}
