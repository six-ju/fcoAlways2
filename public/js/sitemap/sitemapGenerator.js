const fs = require('fs');
const dayjs = require('dayjs');

const DOMAIN = 'https://fcoalways.online';

const staticRoutes = [
    '/',
    '/search/:nickname', // 예시
    // '/official',
    // '/rank',
];

function generateSitemap() {
    const urls = staticRoutes.map(route => {
        return `
        <url>
            <loc>${DOMAIN}${route}</loc>
            <lastmod>${dayjs().format('YYYY-MM-DD')}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join('\n')}
    </urlset>`;

    // public/sitemap.xml로 저장
    fs.writeFileSync('./public/sitemap.xml', xml, 'utf8');
    console.log('사이트맵 저장됨')
}

module.exports = generateSitemap;
