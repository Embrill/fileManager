import React, { FC, useState } from 'react';

import './App.scss';
import FolderFile from './components/folder-file/FolderFile';
import LevelUp from './components/level-up/LevelUp';
import Path from './components/path/Path';

export interface DataItem {
  name: string;
  path: string;
  dir: boolean;
  size: number;
}

const App: FC = () => {
  // Загрузка данных API
  const [data, setData] = useState<DataItem[]>([
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
  const clickHandlerFolder = (idFolder: number) => {
    console.log('Открыта папка:', filterData[idFolder].name);
    setPath(path + '/' + filterData[idFolder].name);
    console.log('id папки:', filterData);
  };

  // Отслеживание клика arrowUp
  const clickHandlerArrowUp = () => {
    const toSplitPath = path.split('/');
    toSplitPath.pop();
    setPath(toSplitPath.join('/'));
  };

  // Удаление файлов
  const onClickRemoveFile = (event: React.MouseEvent<HTMLAnchorElement>, idFile: number) => {
    event.preventDefault();
    const updateData = [...filterData];
    console.log(`Файл '${updateData[idFile].name}' удален`);
    console.log(updateData[idFile].path);
    // delete updateData[idFile].path; // Удаление пути
    updateData[idFile].path = 'delete'; // Или переименование пути
    setData([...data]);
  };

  // Добавление файлов дропом
  // const inputRef = React.useRef<HTMLInputElement>(null);
  const onDragAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Получение файла с input`a
    if (event.currentTarget.files) {
      const getFile = event.currentTarget.files[0];

      // getFile.path = path;

      console.log(`Новый файл '${getFile.name}' добавлен`);

      const newFile = {
        path: path,
        name: getFile.name,
        dir: getFile.type ? false : true, // Определение папка или нет
        size: 0,
      };

      const checkDublicateFileName = Array.from(filterData, ({ name }) => name).includes(getFile.name);

      if (checkDublicateFileName) {
        alert('Файл/папка с таким именем уже существует');
      } else {
        const updatedList = [...data, newFile];
        setData(updatedList);
      }
    }
  };

  // Переименование файла
  const [valueInput, setValueInput] = useState<string>('');
  const [editMode, setEditMode] = useState<number>(NaN);
  const onClickEditName = (idFile: number, titleFile: string) => {
    setEditMode(idFile);
    setValueInput(titleFile);
  };
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };

  // Обработчик нажатия клавиши Enter
  const onKeyDownValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
        .filter((x) => x !== undefined)[0]?.name;

      const oldFileNameReg = new RegExp(oldFileName || '', 'g');

      // Обновленные пути для data
      const newPathForData = data
        .map((x) => x.path)
        .join(',')
        .replace(oldFileNameReg, newFileName || oldFileName + '') //  oldFileName + '' - если папку переименовали в пустоту
        .split(',');

      // Присвоение путей data
      for (let i = 0; i < newPathForData.length; i++) {
        data[i].path = newPathForData[i];
      }
      // Выход из режима редактирования
      setEditMode(NaN);

      // console.log(data.map((x) => x.path));
      console.log(newFileName);
    }
  };

  return (
    <div className="file-manager">
      <div className="file-manager__container">
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
          <input type="file" value="" onClick={(e) => e.preventDefault()} onChange={(e) => onDragAddFile(e)} />
        </main>
      </div>
    </div>
  );
};

export default App;
