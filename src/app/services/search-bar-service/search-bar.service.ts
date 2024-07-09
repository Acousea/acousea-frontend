import {Injectable} from '@angular/core';

export const SEARCH_CONTENT: { [key: string]: { title: string, content: string } } = {
  '/summary': { title: 'Summary', content: 'Summary page frequency system map' },
  '/map': { title: 'Map', content: 'Map page navigation location' },
  '/history/iridium-messages': { title: 'Iridium Messages History', content: 'Iridium messages communication history log changes' },
  '/history/control-system': { title: 'Control System History', content: 'Control system logs events history log changes' },
  '/history/pam-system': { title: 'PAM System History', content: 'Pam system data analysis history log changes' },
  '/configuration/recording-processing': { title: 'Recording and Processing', content: 'Recording audio processing configuration settings' },
  '/configuration/control-system': { title: 'Control System Configuration', content: 'Control system configuration settings' },
  '/configuration/pam-system': { title: 'PAM System Configuration', content: 'PAM system configuration settings' },
  '/system-info': { title: 'System Info', content: 'System information details about' }
};
export interface SearchContent {
  title: string;
  content: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private contentIndex: { [key: string]: SearchContent[] } = {};

  constructor() {
    this.indexContent();
    console.log("CONTENT INDEX", this.contentIndex);
  }

  private indexContent() {
    for (const route in SEARCH_CONTENT) {
      if (SEARCH_CONTENT.hasOwnProperty(route)) {
        const { title, content } = SEARCH_CONTENT[route];
        this.addPageContent(route, title, content);
      }
    }
  }

  private addPageContent(route: string, title: string, content: string) {
    const words = content.toLowerCase().split(' ');
    words.forEach(word => {
      for (let i = 1; i <= word.length; i++) {
        const sub = word.substring(0, i);
        if (!this.contentIndex[sub]) {
          this.contentIndex[sub] = [];
        }
        this.contentIndex[sub].push({ title, content, route });
      }
    });
  }
  search(query: string): SearchContent[] {
    const lowerQuery = query.toLowerCase();
    return this.contentIndex[lowerQuery] || [];
  }
}
