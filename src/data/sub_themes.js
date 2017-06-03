export const sub_themes = [
    {
        url_slug: 'appointments',
        theme_url_slug: 'access-to-legal-aid',
        name: 'Appointments',
        description: 'Appointment of a) Legal Aid Counsel, b) Panel Lawyers and c) Retainer Lawyers'
    },
    {
        url_slug: 'representations',
        theme_url_slug: 'access-to-legal-aid',
        name: 'Representations',
        description: 'Representation by a) Legal Aid Counsel, b) Panel Lawyers and c) Retainer Lawyers'
    },
    {
        url_slug: 'releases',
        theme_url_slug: 'access-to-legal-aid',
        name: 'Releases',
        description: 'Releases from jail through a) Legal Aid Counsel, b) Panel Lawyers, and c) Retainer Lawyers'
    },
    {
        url_slug: 'legal-aid-at-police-station',
        theme_url_slug: 'access-to-legal-aid',
        name: 'Legal Aid at police station',
        description: 'Whether Legal aid has been provided at police station ?'
    }
];

export const getSubThemes = theme => sub_themes.filter(s => s.theme_url_slug === theme.url_slug);
