// Formats an ISO date string for display, in Hebrew locale:
export function formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Formats the duration between two ISO date strings as "X hours Y minutes":
export function formatDuration(startIso: string, endIso: string): string {
    const startTime = new Date(startIso).getTime();
    const endTime = new Date(endIso).getTime();
    const totalMinutes = Math.max(0, Math.round((endTime - startTime) / 60000));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
        return `${minutes} דקות`;
    }
    if (minutes === 0) {
        return `${hours} שעות`;
    }
    return `${hours} שעות ו-${minutes} דקות`;
}

// True if the meeting's start time is still in the future relative to now:
export function isFutureStart(startIso: string): boolean {
    return new Date(startIso).getTime() > Date.now();
}

// Converts an ISO date string to the "yyyy-MM-ddTHH:mm" format expected by <input type="datetime-local">:
export function toDatetimeLocalValue(isoString: string): string {
    const date = new Date(isoString);
    const pad = (value: number): string => String(value).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
