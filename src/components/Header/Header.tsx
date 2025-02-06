import { useEffect } from "react"
import './Header.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getGenres } from "../../store/slices/genresSlice"

const Header = () => {
    const dispatch = useAppDispatch()
    const {genres} = useAppSelector((state) => state.genresData)

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    return (
        <div>Header</div>
    )
}

export default Header