// API yapılandırması için güvenlik kontrolü
const requiredEnvVars = [
    'TMDB_API_KEY',
    'JWT_SECRET',
    'DB_PASSWORD'
];

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        throw new Error(`Eksik environment değişkeni: ${envVar}`);
    }
});

// API yapılandırması
const apiConfig = {
    tmdb: {
        baseURL: 'https://api.themoviedb.org/3',
        timeout: 5000
    }
};

module.exports = apiConfig; 