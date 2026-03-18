const https = require('https');

https.get('https://pkbm.id/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const textMatches = data.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g) || [];
    const pMatches = data.match(/<p[^>]*>(.*?)<\/p>/g) || [];
    console.log("=== HEADINGS ===");
    console.log(textMatches.map(h => h.replace(/<[^>]*>?/gm, '').trim()).filter(h => h.length > 0).join('\n'));
    // console.log("=== PARAGRAPHS ===");
    // console.log(pMatches.map(p => p.replace(/<[^>]*>?/gm, '').trim()).filter(p => p.length > 20).slice(0, 10).join('\n'));
  });
}).on('error', (err) => console.log('Error: ' + err.message));
