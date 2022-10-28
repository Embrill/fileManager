import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState('');
  const [data, setData] = useState({
    path: '',
    files: [],
  });

  useEffect(() => {
    setLoading(false);
    fetch('https://633e73820dbc3309f3b5d032.mockapi.io/file_manager/')
      .then((res) => res.json())
      .then((result) => {
        setParent('');
        setData(result);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  const clickHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.attributes.href.value);
    //  fetch('http://localhost:8000/?path=' + event.target.attributes.href.value)
    fetch('https://633e73820dbc3309f3b5d032.mockapi.io/file_manager/')
      .then((res) => res.json())
      .then(
        (result) => {
          let linkArr = result[0].path.split('/');
          console.log(linkArr);
          linkArr.pop();
          setParent(linkArr.join('/'));
          setData(result);
        },
        (error) => {}
      )
      .finally(() => {});
  };

  loading && console.log(data[0]);

  return (
    <div className="file-manager">
      {loading ? (
        <>
          <div>
            <a href={parent} onClick={clickHandler}>
              <span className="material-icons">&#xe5d8;</span>
              LEVEL UP
            </a>
          </div>
          <div className="current-level">current: {data.path === '' ? '/' : data.path}</div>
          <ul className="folder-list">
            {data[0].files.map((item) => {
              if (item.dir) {
                return (
                  <li className="folder" key={item.name}>
                    <a href={data.path + '/' + item.name} onClick={clickHandler}>
                      <span className="material-icons">&#xe2c7;</span>
                      {item.name.toUpperCase()}
                    </a>
                  </li>
                );
              } else {
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
      ) : null}
    </div>
  );
}

export default App;
