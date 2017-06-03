export const sub_themes = [
    {
        url_slug: 'appointments',
        theme_url_slug: 'access-to-legal-aid',
        name: 'Appointments',
        description: 'Appointments'
    },
    {
        url_slug: 'representations',
        theme_url_slug: 'access-to-legal-aid',
        name: 'Representations',
        description: 'Representations'
    },
    {
        url_slug: 'releases',
        theme_url_slug: 'access-to-legal-aid',
        name: 'Releases',
        description: 'Releases'
    },
    {
        url_slug: 'legal-aid-at-police-station',
        theme_url_slug: 'access-to-legal-aid',
        name: 'Legal Aid at police station',
        description: 'Legal Aid at police station'
    }
];

export const getSubThemes = theme => sub_themes.filter(s => s.theme_url_slug === theme.url_slug);
