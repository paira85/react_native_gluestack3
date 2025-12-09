export const formatDateTimes = (timestamp: string | number): string => {
  if (!timestamp) return ""; // null/undefined 방어

  const d = new Date(Number(timestamp));

  // 한국 시간 보정 (UTC 저장된 타임스탬프일 경우)
  d.setHours(d.getHours() + 9);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


export const formatDate = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
