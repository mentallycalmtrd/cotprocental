export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
 
  const { code, limit = '60', report = 'tff' } = req.query;
  if (!code) return res.status(400).json({ error: 'code required' });
 
  const lim = Math.min(Number(limit), 260);
  const isTFF = report !== 'legacy';
  const dataset = isTFF ? 'junm-p6e5' : '6dca-aqww';
 
  const tffFields = [
    'report_date_as_yyyy_mm_dd','open_interest_all',
    'asset_mgr_positions_long_all','asset_mgr_positions_short_all',
    'lev_money_positions_long_all','lev_money_positions_short_all',
    'dealer_positions_long_all','dealer_positions_short_all',
    'other_rept_positions_long_all','other_rept_positions_short_all',
    'nonrept_positions_long_all','nonrept_positions_short_all',
  ].join(',');
 
  const legacyFields = [
    'report_date_as_yyyy_mm_dd','open_interest_all',
    'noncomm_positions_long_all','noncomm_positions_short_all',
    'comm_positions_long_all','comm_positions_short_all',
    'nonrept_positions_long_all','nonrept_positions_short_all',
  ].join(',');
 
  const url =
    'https://publicreporting.cftc.gov/resource/' + dataset + '.json' +
    '?cftc_contract_market_code=' + encodeURIComponent(code) +
    '&$order=report_date_as_yyyy_mm_dd DESC' +
    '&$limit=' + lim +
    '&$select=' + (isTFF ? tffFields : legacyFields);
 
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('CFTC ' + r.status);
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}cat > api/cot.js << 'EOF'
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const { code, limit = '60', report = 'tff' } = req.query;
  if (!code) return res.status(400).json({ error: 'code required' });
  const lim = Math.min(Number(limit), 260);
  const isTFF = report !== 'legacy';
  const dataset = isTFF ? 'junm-p6e5' : '6dca-aqww';
  const tffFields = 'report_date_as_yyyy_mm_dd,open_interest_all,asset_mgr_positions_long_all,asset_mgr_positions_short_all,lev_money_positions_long_all,lev_money_positions_short_all,dealer_positions_long_all,dealer_positions_short_all,other_rept_positions_long_all,other_rept_positions_short_all,nonrept_positions_long_all,nonrept_positions_short_all';
  const legacyFields = 'report_date_as_yyyy_mm_dd,open_interest_all,noncomm_positions_long_all,noncomm_positions_short_all,comm_positions_long_all,comm_positions_short_all,nonrept_positions_long_all,nonrept_positions_short_all';
  const url = 'https://publicreporting.cftc.gov/resource/' + dataset + '.json?cftc_contract_market_code=' + encodeURIComponent(code) + '&$order=report_date_as_yyyy_mm_dd DESC&$limit=' + lim + '&$select=' + (isTFF ? tffFields : legacyFields);
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
EOF