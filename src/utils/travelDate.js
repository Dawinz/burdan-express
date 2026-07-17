const EAT_OFFSET_MS = 3 * 60 * 60 * 1000;

const pad = (value) => String(value).padStart(2, '0');

export const todayInTanzania = () => {
  const eat = new Date(Date.now() + EAT_OFFSET_MS);
  return new Date(eat.getUTCFullYear(), eat.getUTCMonth(), eat.getUTCDate());
};

export const formatDateDmy = (date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return `${pad(normalized.getDate())}/${pad(normalized.getMonth() + 1)}/${normalized.getFullYear()}`;
};

export const formatDmyInput = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export const parseDateDmy = (value) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) {
    return null;
  }

  const day = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const year = Number.parseInt(match[3], 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const dateToYmd = (date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return `${normalized.getFullYear()}-${pad(normalized.getMonth() + 1)}-${pad(normalized.getDate())}`;
};
