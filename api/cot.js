export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const { code, limit = '60' } = req.query;
  if (!code) return res.status(400).json({ error: 'code required' });
  const lim = Math.min(Number(limit), 260);
  const url = 'https://publicreporting.cftc.gov/resource/6dca-aqww.json'
    + '?cftc_contract_market_code=' + encodeURIComponent(code)
    + '&$order=report_date_as_yyyy_mm_dd DESC'
    + '&$limit=' + lim
    + '&$select=report_date_as_yyyy_mm_dd,open_interest_all,noncomm_positions_long_all,noncomm_positions_short_all,comm_positions_long_all,comm_positions_short_all,nonrept_positions_long_all,nonrept_positions_short_all';
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('CFTC ' + r.status);
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
