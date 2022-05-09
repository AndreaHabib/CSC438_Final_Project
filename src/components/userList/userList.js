import { getFavoriteMovies } from "../../firebase-config"
import {useState} from "react";

function UserList() {


    const [userList, setUserList] = useState([]);

    getFavoriteMovies(setUserList);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {userList.map((user) => {
                    return (
                        <li key={user.id}>
                            <h2>{user.email}</h2>
                            <h3>{user.favoriteMovies}</h3>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}