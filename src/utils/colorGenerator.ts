export function getColor(value: number, minValue: any, maxValue: any) {
  // Definições das cores em RGB
  const colorMin = [0, 181, 0]; // verde
  const colorMiddle1 = [242, 229, 48]; // amarelo
  const colorMiddle2 = [255, 103, 0]; // laranja
  const colorMax = [224, 25, 25]; // vermelho

  // Normaliza o valor entre 0 e 1
  const normalizedValue = (value - minValue) / (maxValue - minValue);

  if (normalizedValue <= 0) {
    return `rgb(${colorMin.join(",")})`; // cor verde
  } else if (normalizedValue >= 1) {
    return `rgb(${colorMax.join(",")})`; // cor vermelha
  } else if (normalizedValue < 0.5) {
    // Interpola entre verde e amarelo
    const ratio = normalizedValue * 2; // Normaliza para 0-2
    const r = Math.round(colorMin[0] + (colorMiddle1[0] - colorMin[0]) * ratio);
    const g = Math.round(colorMin[1] + (colorMiddle1[1] - colorMin[1]) * ratio);
    const b = Math.round(colorMin[2] + (colorMiddle1[2] - colorMin[2]) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Interpola entre amarelo e vermelho
    const ratio = (normalizedValue - 0.5) * 2; // Normaliza para 0-2
    const r = Math.round(
      colorMiddle1[0] + (colorMax[0] - colorMiddle1[0]) * ratio
    );
    const g = Math.round(
      colorMiddle1[1] + (colorMax[1] - colorMiddle1[1]) * ratio
    );
    const b = Math.round(
      colorMiddle1[2] + (colorMax[2] - colorMiddle1[2]) * ratio
    );
    return `rgb(${r}, ${g}, ${b})`;
  }
}
