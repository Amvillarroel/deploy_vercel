function getMovieAdapter(response) {
  const adaptedData = response.map((item) => {
    const { id, title: title, poster_path: poster, release_date: date } = item;
    return { id, title, poster, date };
  });
  return adaptedData;
};
export { getMovieAdapter };