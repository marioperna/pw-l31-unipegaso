export function extractFromLocalStorage(key: string): Record<string, any> | null {
  if (!key) {
    console.error('KEY_IS_REQUIRED');
    return null;
  }

  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }

  return JSON.parse(value);
}


export function saveToLocalStorage(key: string, value: Record<string, any>) {
  if (!key) {
    console.error('KEY_IS_REQUIRED');
    return;
  }

  if (!value) {
    console.error('VALUE_IS_REQUIRED');
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}


export function removeLocalStorage(key: string) {
  if (!key) {
    console.error('KEY_IS_REQUIRED');
    return;
  }

  localStorage.removeItem(key);
}


export function roundTo2Decimal(value: number): number {
  if (!value) return 0;
  return Math.round(value * 100) / 100;
}