export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
    if (!PIXABAY_API_KEY) {
        return res.status(500).json({ error: 'Pixabay API key not configured' });
    }

    const { q, page } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'Missing query parameter: q' });
    }

    try {
        const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=horizontal&per_page=3&page=${page || 1}`;
        const response = await fetch(url);
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Upstream request failed', details: err.message });
    }
}