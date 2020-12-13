export default function searchString(str: string, search: string): boolean {
    return str.toLowerCase().includes(search.toLowerCase());
}
