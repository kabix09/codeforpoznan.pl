export default interface Project {
    id: string;
    name: string;
    location?: string;
    date: string;
    desc: string;
    longDesc: string;
    tags: string[];
    status?: string;
    link: string;
    image: string;
}