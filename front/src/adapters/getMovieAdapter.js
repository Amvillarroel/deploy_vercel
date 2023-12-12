function getMovieAdapter(response) {
  const adaptedData = response.map((item) => {
    const { id, title: title, poster_path: poster, release_date: date, backdrop_path
: backdrop, overview} = item;
    return { id, title, poster, backdrop, date, overview };
  });
  return adaptedData;
};
export { getMovieAdapter };