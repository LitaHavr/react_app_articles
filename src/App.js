import React, {useRef, useState, useMemo} from "react";
import Counter from "./components/counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";


function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'dddd', body: 'eeee'},
        {id: 2, title: 'aaa 2', body: 'dd'},
        {id: 3, title: 'vvvv 3', body: 'cccc'},
        {id: 4, title: '', body: 'qqq'},

    ])

    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')


    const sortedPosts = useMemo(() => {
        console.log('сортед пост отработала')
        if (selectedSort) {
            console.log([...posts])
            const postDone =  [...posts].sort((a, b) =>
                a[selectedSort].localeCompare(b[selectedSort]))

            console.log(postDone)
            return postDone;
        }
        return posts;
    }, [selectedSort, posts])


    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery) )
    }, [searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }


    //Получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sortedData) => {
        console.log(sortedData)

        setSelectedSort(sortedData);

    }

    return (
        <div className="App">

            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <MyInput
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder='Поиск  постов
                    '/>
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue='Сортировка по'
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'},
                    ]}
                />
            </div>
            {sortedAndSearchedPosts.length !== 0
                ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про js'/>
                : <h1 style={{textAlign: 'center'}}> Посты не найденны</h1>
            }


        </div>
    );
}

export default App;
