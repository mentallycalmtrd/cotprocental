export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { code, limit = '60' } = req.query;
  if (!code) return res.status(400).json({ error: 'code required' });

  const fields = [
    'report_date_as_yyyy_mm_dd',
    'open_interest_all',
    'noncomm_positions_long_all',
    'noncomm_positions_short_all',
    'comm_positions_long_all',
    'comm_positions_short_all',
    'nonrept_positions_long_all',
    'nonrept_positions_short_all',
  ].join(',');

  const url =
    `https://publicreporting.cftc.gov/api/explore/v2.1/catalog/datasets/cot-reports/records` +
    `?where=cftc_commodity_code%3D%22${encodeURIComponent(code)}%22` +
    `&order_by=report_date_as_yyyy_mm_dd%20desc` +
    `&limit=${Math.min(Number(limit), 260)}` +
    `&select=${fields}`;

  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`CFTC ${r.status}`);
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
