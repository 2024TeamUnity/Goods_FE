export const getTime = (time: number) => {
  if (time < 60) {
    return `${time}초 전`;
  }
  if (time / 60 < 60) {
    const convertedTime = Math.floor(time / 60);
    return `${convertedTime}분 전`;
  }
  if (time / 60 / 60 < 24) {
    const convertedTime = Math.floor(time / 60 / 60);
    return `${convertedTime}시간 전`;
  }
  if (time / 60 / 60 / 24 < 30) {
    const convertedTime = Math.floor(time / 60 / 60 / 24);
    return `${convertedTime}일 전`;
  }
  if (time / 60 / 60 / 24 / 30 < 12) {
    const convertedTime = Math.floor(time / 60 / 60 / 24 / 30);
    return `${convertedTime}개월 전`;
  }
  const convertedTime = Math.floor(time / 60 / 60 / 24 / 30 / 12);
  return `${convertedTime}년 전`;
};
