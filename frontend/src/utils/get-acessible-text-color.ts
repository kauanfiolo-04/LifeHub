export function getAccessibleTextColor(hex: string) {
  const normalized = hex.replace("#", "").slice(0, 6);

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  const toLinear = (value: number) => {
    const channel = value / 255;

    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  };

  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  const contrastWhite = (1.05) / (luminance + 0.05);
  const contrastBlack = (luminance + 0.05) / 0.05;

  return contrastWhite > contrastBlack ? "#FFFFFF" : "#000000";
}