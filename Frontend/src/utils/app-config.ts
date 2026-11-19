// Centralizes every server URL used across the app - no Service should build a URL manually.
class AppConfig {

    public readonly apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

    public readonly devGroupsUrl = `${this.apiBaseUrl}/dev-groups`;
    public readonly meetingsUrl = `${this.apiBaseUrl}/meetings`;

    public meetingsByDevGroupUrl(devGroupId: string): string {
        return `${this.meetingsUrl}/dev-group/${devGroupId}`;
    }

    public meetingByIdUrl(id: string): string {
        return `${this.meetingsUrl}/${id}`;
    }

}

export const appConfig = new AppConfig();
