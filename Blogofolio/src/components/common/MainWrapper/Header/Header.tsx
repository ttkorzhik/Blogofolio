import React, {ChangeEvent, FC, FormEvent, useState} from 'react';

import MenuHamburger from "./MenuHamburger/MenuHamburger";
import Search from "./Search/Search";
import LoggedInUser from "./LoggedInUser/LoggedInUser";
import User from "./User/User";
import SearchForm from "./Search/SearchForm/SearchForm";
import styles from "./Header.module.css"
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {Routes} from "../../../AppRouter/routes";


const Header:FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const location = useLocation()
    const navigate = useNavigate();

    const handleSearchQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        location.search = `?search=${event.target.value}`
    }

    const [search, setSearch] = useState(false)
    const handleSetSearch = () => setSearch(true)
    const handleCloseSearch = () => setSearch(false)

    const { user } = useSelector((state: any) => state.user)

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        new FormData(event.currentTarget);
        navigate(`${Routes.search}?search=${searchQuery}`)
        setSearchQuery("")
    }

    return (
            <header className={styles.header}>
                <MenuHamburger authorized={!!user}/>
                <SearchForm onClick={handleCloseSearch} id="search" value={searchQuery} onChange={handleSearchQueryChange}
                            type="text" name="search" placeholder="Search" visibility={search} onSubmit={handleSearch}/>
                <div className={styles.rightBlock}>
                    <Search onClick={handleSetSearch}/>
                    <div className={styles.user}>
                        {!!user ?  <LoggedInUser/> : <User/>}
                    </div>
                </div>
            </header>
    );
};

export default Header;