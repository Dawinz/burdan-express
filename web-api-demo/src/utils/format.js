export function formatMoney(amount, currency = 'TZS') {
  const n = Number(amount || 0).toLocaleString('en-US');
  return `${currency} ${n}`;
}

export function formatDuration(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function formatDate(ymd) {
  if (!ymd) return '';
  const d = new Date(`${ymd}T00:00:00`);
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function todayYmd() {
  const d = new Date();
  const tz = new Date(d.getTime() + 3 * 60 * 60 * 1000); // EAT
  return tz.toISOString().slice(0, 10);
}
