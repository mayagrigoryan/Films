import { GenresType } from '../../types'
import './ui.css'

type BTNPropsType = {
    genre : GenresType;
    onClick: (genreId: number) => void;
}

function BTN({genre, onClick} : BTNPropsType) {
  return (
    <button className='genres-btn' onClick={() => onClick(genre.id)}>
        {genre.name}
    </button>
  );
}

export default BTN