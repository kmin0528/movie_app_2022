import React  from "react";
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';
class Home extends React.Component { /* APP클래스에 React.Component 클래스의 기능을 추가할 수 있게 해준다. */
  state = {
    isLoading: true,
    movies: [],
  };
  // axios.get()을 실행하려면 시간이 필요하다.
  // async => 실행시 시간이 필요할때 시간이 필요한 대상앞에 await과 함께 사용
  getMovies = async() => {
    const{
      data: {
        data: {movies},
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({movies, isLoading: false})
  }
  componentDidMount() {
    //영화 데이터 로딩!
    this.getMovies();
  }
  render() {
    const {isLoading, movies} = this.state;
    return (
      <section className = "container"> 
      {isLoading ? (
        <div className = "loader__text">
          <span className = "loader__text">Loding..</span>
        </div>
      ) : (
        <div className = "movies">
        {movies.map((movie) => (
        <Movie
          key = {movie.id}
          id = {movie.id}
          year = {movie.year}
          title = {movie.title}
          summary = {movie.summary}
          poster = {movie.medium_cover_image}
          genres = {movie.genres}
        />
        ))}
      </div>
    )}
    </section>
    );
  }
}
export default Home;
