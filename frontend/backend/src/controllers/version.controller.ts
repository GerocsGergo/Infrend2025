import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

export class VersionController {
    // repository: Repository<any>;
    private version: string;

    constructor() {
        this.version = this.parseVersionFromChangelog();
    }

    getVersion = async (req: Request, res: Response) => {
        try {
            res.json({ version: this.version });
        } catch (err) {
            this.handleError(res, err);
        }
    };

    handleError = (res: Response, err: any, status = 500, message = 'Unknown server error.') => {
        if (err) {
            console.error(err);
        }
        res.status(status).json({ message });
    }

    private parseVersionFromChangelog(): string {
        try {
            const changelogPath = join(__dirname, '../../../CHANGELOG.md');
            const changelogContent = readFileSync(changelogPath, 'utf-8');
            
            // Extract all version entries (e.g., v0.0.0, v0.0.1, etc.)
            const versionMatches = [...changelogContent.matchAll(/## \[(v?\d+\.\d+\.\d+)\]/g)];
            
            if (versionMatches.length > 0) {
                // Extract versions as strings
                const versions = versionMatches.map(match => match[1]);
                
                // Sort versions in descending order
                versions.sort((a, b) => this.compareVersions(b, a));

                // Return the most recent version
                return versions[0];
            }
            
            return "0.0.0";  // Default to 0.0.0 if no version found
        } catch (err) {
            console.error('Failed to parse CHANGELOG.md:', err);
            return "0.0.0";
        }
    }

    private compareVersions(version1: string, version2: string): number {
        const v1Parts = version1.replace('v', '').split('.').map(Number);
        const v2Parts = version2.replace('v', '').split('.').map(Number);

        for (let i = 0; i < 3; i++) {
            if (v1Parts[i] > v2Parts[i]) return 1;
            if (v1Parts[i] < v2Parts[i]) return -1;
        }
        return 0;  // Versions are the same
    }
    
}
