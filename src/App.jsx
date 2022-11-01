import React, { useState } from 'react';

import './App.scss';

function App() {
  // Загрузка данных API
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
    {
      name: 'works.txt',
      path: '',
      dir: false,
      size: 2952,
    },
  ]);
  const [path, setPath] = useState('');
  // Отфильтрованный массив по пути
  const filterData = data.filter((x) => x.path === path);

  // Отслеживание клика папок
  const clickHandlerFolder = (event, idFolder) => {
    event.preventDefault();
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

  // Удаление файлов
  const onClickRemoveFile = (e, idFile) => {
    e.preventDefault();
    const updateData = [...filterData];
    console.log(updateData[idFile].path);
    delete updateData[idFile].path; // Удаление пути
    // updateData[idFile].path = 'delete'; // Или переименование пути
    setData([...data]);
  };

  // Добавление файлов дропом
  const onDragAddFile = (e) => {
    const getFile = e.target.files[0]; // Получение файла с input`a
    getFile.path = path;

    console.log('Новый файл', getFile);

    const newFile = {
      path: path,
      name: getFile.name,
      dir: getFile.type ? false : true, // Определение папка или нет
    };

    const checkDublicateFileName = Array.from(filterData, ({ name }) => name).includes(getFile.name);

    if (checkDublicateFileName) {
      alert('Файл/папка с таким именем уже существует');
    } else {
      const updatedList = [...data, newFile];
      setData(updatedList);
    }
  };

  const [valueInput, setValueInput] = useState('');
  const [editMode, setEditMode] = useState(null);
  const onClickEditName = (idFile, titleFile, e) => {
    setEditMode(idFile);
    setValueInput(titleFile);
    // докрутить value
  };
  const onChangeValue = (e) => {
    setValueInput(e.target.value);
  };

  const onKeyDownValue = (e) => {
    if (e.key === 'Enter') {
      // Старое имя файла
      const oldFileName = filterData
        .map((item, itemId) => {
          if (itemId === editMode) {
            return item.name;
          }
        })
        .filter((x) => x !== undefined)[0];
      console.log(oldFileName);

      // Новое имя файла
      const newFileName = filterData
        .map((item, itemId) => {
          if (itemId === editMode && valueInput.length > 0) {
            item.name = valueInput;
            return item;
          }
        })
        .filter((x) => x !== undefined)[0].name;

      const oldFileNameReg = new RegExp(oldFileName, 'g');

      // Обновленные пути для data
      const newPathForData = data
        .map((x) => x.path)
        .join(',')
        .replace(oldFileNameReg, newFileName)
        .split(',');

      // Присвоение путей data
      for (let i = 0; i < newPathForData.length; i++) {
        data[i].path = newPathForData[i];
      }
      // Выход из режима редактирования
      setEditMode(null);

      // console.log(data.map((x) => x.path));
      console.log(newFileName);
    }
  };
  // Пофиксить открытие файлов и их иконки

  // Консоль
  console.log('Массив изначальный:', data);
  console.log('Массив отфильтрован:', filterData);

  return (
    <div className="file-manager">
      <input type="file" value="" onClick={(e) => e.preventDefault()} onChange={onDragAddFile} />
      {/* Arrow UP */}
      <div className="level-up">
        <div className="level-up__body" onClick={clickHandlerArrowUp}>
          <span className="level-up__icon material-icons">&#xe5d8;</span>
          <span className="level-up__text">LEVEL UP</span>
        </div>
      </div>
      {/* /path */}
      <div className="current-level">path: {path}</div>
      {/* Папки */}
      <ul className="folder-list">
        {filterData.map((item, index) => {
          return (
            <li className={item.dir ? 'folder' : 'file'} key={index}>
              <span className="material-icons" onClick={(e) => clickHandlerFolder(e, index)}>
                &#xe2c7;
              </span>

              {editMode === index ? (
                <input
                  value={valueInput}
                  onKeyDown={(e) => onKeyDownValue(e, index)}
                  onChange={(e) => onChangeValue(e)}
                  type="text"
                />
              ) : (
                <span onClick={() => onClickEditName(index, item.name)}>{item.name}</span>
              )}
              <a href="/" onClick={(e) => onClickRemoveFile(e, index)}>
                <svg id="Icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style></style>
                  </defs>
                  <path
                    className="cls-1"
                    d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"
                  />
                  <path
                    className="cls-1"
                    d="M16.707,7.293a1,1,0,0,0-1.414,0L12,10.586,8.707,7.293A1,1,0,1,0,7.293,8.707L10.586,12,7.293,15.293a1,1,0,1,0,1.414,1.414L12,13.414l3.293,3.293a1,1,0,0,0,1.414-1.414L13.414,12l3.293-3.293A1,1,0,0,0,16.707,7.293Z"
                  />
                </svg>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
