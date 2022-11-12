import React, { FC } from 'react';
import { DataItem } from '../../App';
import './folder-file.scss';

interface IFolderFile {
  filterData: DataItem[];
  clickHandlerFolder: (index: number) => void;
  editMode: number;
  valueInput: string;
  onKeyDownValue: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEditName: (index: number, item: string) => void;
  onClickRemoveFile: (e: React.MouseEvent<HTMLAnchorElement>, index: number) => void;
  setEditMode: (a: number) => void;
  clickHandlerFile: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const FolderFile: FC<IFolderFile> = ({
  filterData,
  clickHandlerFolder,
  editMode,
  valueInput,
  onKeyDownValue,
  onChangeValue,
  onClickEditName,
  onClickRemoveFile,
  setEditMode,
  clickHandlerFile,
}) => {
  return (
    <ul className="folder-list">
      {filterData.map((item: DataItem, index: number) => {
        return (
          <li className={item.dir ? 'folder' : 'file'} key={index}>
            <span
              className="material-icons"
              onDoubleClick={item.dir ? () => clickHandlerFolder(index) : (e) => clickHandlerFile(e)}
            >
              {item.dir ? <>&#xe2c7;</> : <>&#xe873;</>}
            </span>

            {editMode === index ? (
              <>
                <input
                  className="folder-file__edit"
                  value={valueInput}
                  onKeyDown={(e) => onKeyDownValue(e, index)}
                  onChange={(e) => onChangeValue(e)}
                  type="text"
                  autoFocus
                />
                <div className="folder-file__input-bg" onClick={() => setEditMode(NaN)}></div>
              </>
            ) : (
              <span className="folder-file__name" onClick={() => onClickEditName(index, item.name)}>
                {item.name}
              </span>
            )}
            <a className="folder-file__remove" href="/" onClick={(e) => onClickRemoveFile(e, index)}>
              <svg className="folder-file__icon" id="Icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
  );
};

export default FolderFile;
