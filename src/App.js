import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  // Загрузка данных API
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([
    {
      name: 'movies',
      path: '',
      dir: true,
      size: 0,
    },
    {
      name: 'somefolder',
      path: '/movies',
      dir: true,
      size: 0,
    },
    {
      name: 'secondfolder',
      path: '/movies/somefolder',
      dir: true,
      size: 0,
    },
    {
      name: 'summer',
      path: '',
      dir: true,
      size: 0,
    },
    {
      name: 'music',
      path: '/summer',
      dir: true,
      size: 0,
    },
    {
      name: 'lorem.txt',
      path: '/summer',
      dir: false,
      size: 2952,
    },
    {
      name: 'sometext.txt',
      path: '',
      dir: false,
      size: 2952,
    },
  ]);
  const [path, setPath] = useState('');
  const [parent, setParent] = useState('');
  // const [dataInner, setDataInner] = useState({});

  // useEffect(() => {
  //   setLoading(false);
  //   fetch('https://633e73820dbc3309f3b5d032.mockapi.io/file_manager/')
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setParent(result);
  //       setData(result);
  //     })
  //     .finally(() => {
  //       setLoading(true);
  //     });
  // }, []);

  // Отслеживание клика папок
  const clickHandlerFolder = (event, idFolder) => {
    event.preventDefault();
    // console.log(event.target.attributes.href.value); // Внутренности ссылки
    // setParent(data);
    // setData(data[id].files);
    // setPath((prev) => prev + '/' + data[id].name);
    // console.log('id папки:', id);
    // console.log('Путь:', data[id].name);

    const filterData = data.filter((x) => x.path === path);

    console.log('Открыта папка:', filterData[idFolder].name);
    setPath(path + '/' + filterData[idFolder].name);
    console.log('id папки:', filterData);
  };

  // Отслеживание клика arrowUp
  const clickHandlerArrowUp = (e) => {
    e.preventDefault();

    const toSplitPath = path.split('/');
    toSplitPath.pop();
    setPath(toSplitPath.join('/'));
  };

  // const dataInner = data[0].files;

  loading &&
    console.log(
      'Массив:',
      data.filter((x) => x.path === path)
    );
  // parent && console.log(parent[0].name);
  // {data[0].path + '/' + item.name}
  return (
    <div className="file-manager">
      {loading ? (
        <>
          {/* Arrow UP */}
          <div>
            <a href="/" onClick={clickHandlerArrowUp}>
              <span className="material-icons">&#xe5d8;</span>
              LEVEL UP
            </a>
          </div>
          {/* /path */}
          <div className="current-level">current: {path}</div>
          {/* Папки */}
          <ul className="folder-list">
            {data
              .filter((x) => x.path === path)
              .map((item, index) => {
                if (item.dir) {
                  return (
                    <li className="folder" key={item.name}>
                      <a href="/" onClick={(e) => clickHandlerFolder(e, index)}>
                        <span className="material-icons">&#xe2c7;</span>
                        {item.name.toUpperCase()}
                      </a>
                    </li>
                  );
                } else {
                  // Файлы
                  return (
                    <li key={item.name} className="file">
                      <span className="material-icons">&#xe873;</span>
                      {item.name}
                    </li>
                  );
                }
              })}
          </ul>
        </>
      ) : (
        <h2>Идет загрузка...</h2>
      )}
    </div>
  );
}

export default App;
