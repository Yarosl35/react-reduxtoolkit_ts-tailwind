import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/Github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {

    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)

    const [fetchRepos, {isLoading: isReposLoading, data: repos}] = useLazyGetUserReposQuery();

    const {isLoading, isError, data: users} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })


    useEffect(() => {
        setDropdown(debounced.length > 3 && users?.length! > 0)
    }, [debounced, users])


    function clickHandler(username: string) {
        fetchRepos(username)
        setDropdown(false)
    }

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className='text-center text-red-600'> Something went wrong... </p>}
            <div className='relative w-[560px]'>
                <input
                    className='border px-4 py-2 w-full h-[42px] mb-2 '
                    type={'text'}
                    placeholder='Search for Github username...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {dropdown && <ul
                  className=' list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll'>
                    {isLoading && <p className='text-center'>Loading...</p>}
                    {users?.map(user => (
                        <li className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                            key={user.id}
                            onClick={() => clickHandler(user.login)}
                        >{user.login}</li>
                    ))}
                </ul>}
                <div className='container'>
                    {isReposLoading && <p className='text-center'>Repos are loading...</p>}
                    {repos?.map((repo)=>(
                        <RepoCard repo={repo} key={repo.id}/>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HomePage;