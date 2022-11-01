import React, { useState } from 'react';

import './App.scss';
import FolderFile from './components/folder-file/FolderFile';
import LevelUp from './components/level-up/LevelUp';
import Path from './components/path/Path';

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
    console.log(`Файл '${updateData[idFile].name}' удален`);
    console.log(updateData[idFile].path);
    delete updateData[idFile].path; // Удаление пути
    // updateData[idFile].path = 'delete'; // Или переименование пути
    setData([...data]);
  };

  // Добавление файлов дропом
  const onDragAddFile = (e) => {
    const getFile = e.target.files[0]; // Получение файла с input`a
    getFile.path = path;

    console.log(`Новый файл '${getFile.name}' добавлен`);

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

  return (
    <div className="file-manager">
      <header>
        <LevelUp clickHandlerArrowUp={clickHandlerArrowUp} />
        <Path path={path} />
      </header>

      <main>
        <FolderFile
          filterData={filterData}
          clickHandlerFolder={clickHandlerFolder}
          editMode={editMode}
          valueInput={valueInput}
          onKeyDownValue={onKeyDownValue}
          onChangeValue={onChangeValue}
          onClickEditName={onClickEditName}
          onClickRemoveFile={onClickRemoveFile}
        />
        <input type="file" value="" onClick={(e) => e.preventDefault()} onChange={onDragAddFile} />
      </main>
    </div>
  );
}

export default App;
