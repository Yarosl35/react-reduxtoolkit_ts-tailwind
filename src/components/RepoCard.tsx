import React, {useState} from 'react';
import {IRepo} from "../models/models";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";

const RepoCard = ({repo}: { repo: IRepo }) => {

    const {addFavourites, removeFavourites} = useActions()

    const {favourites} = useAppSelector(state => state.github)

    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

    function addFavourite(even: React.MouseEvent<HTMLButtonElement>) {
        even.preventDefault()
        addFavourites(repo.html_url)
        setIsFav(true)
    }

    function removeFromFavourite(even: React.MouseEvent<HTMLButtonElement>) {
        even.preventDefault()
        removeFavourites(repo.html_url)
        setIsFav(false)
    }

    return (
        <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all '>
            <a href={repo.html_url} target={'_blank'}>
                <h2 className='text-lg font-bold '> {repo.full_name}</h2>
                <p className='text-sm'>
                    Forks:<span className='font-bold mr-2'>{repo.forks}</span>
                    Watchers:<span className='font-bold'>{repo.watchers}</span>
                </p>
                <p className='font-thin text-sm mb-3'>{repo?.description}</p>
                {!isFav && <button className='mr-2 px-4 py-2 bg-green-400 rounded hover:shadow-md transition-all'
                                   onClick={addFavourite}
                >Add
                </button>}

                {isFav && <button className='px-4 py-2 bg-red-400 rounded hover:shadow-md transition-all'
                                  onClick={removeFromFavourite}
                >Remove
                </button>}
            </a>
        </div>
    );
};

export default RepoCard;