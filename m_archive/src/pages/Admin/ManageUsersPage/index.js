import React, { useCallback, useEffect, useState } from 'react';
import {
  AdminLNB,
  Button,
  CheckBox,
  SearchBox,
  TableElements,
  TableMenu,
} from '../../../components';

import styles from './manageUsers.module.scss';
import Users from '../../../components/Common/TableElements/Users';
import userStyle from '../../../components/Common/TableElements/tableElements.module.scss';
import { countUsers, deleteUserAdmin, getUsers } from '../../../api/Users';
import dayjs from 'dayjs';
import Pagination from '../../../components/Common/PageNation';
import cx from 'classnames';
import useModal from '../../../components/Common/Modal/useModal';
import { Modal } from '../../../components';
import EditModal from '../EditModal';

const ManageUsersPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const isAllChecked = selectedUsers.length === users.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOption, showModal] = useModal();

  const [isChecked, setIsChecked] = useState(false);

  const onClick = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (!users) return;
    setUsers(users);
  }, [users]);

  const handleSubmit = async (event) => {
    const response = await getUsers(1, 10, event.target.value);
    if (response.status === 200) {
      const items = [...response.data.data];
      setUsers(items);
      setTotalPages(Math.ceil(items.length / pageLimit));
      setCurrentPage(1);
    }
    if (event.target.value === '') {
      // 검색어가 비어있는 경우
      setTotalPages(response.length / pageLimit);
      setCurrentPage(1);
      return;
    }
  };

  const onGetUsers = async () => {
    const response = await getUsers(1, 10);
    if (response.status === 200) {
      const items = [...response.data.data];
      setUsers(items);
    }
  };

  const onCheckUser = (id) => {
    return () => {
      if (selectedUsers.includes(id)) {
        setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
      } else {
        setSelectedUsers([...selectedUsers, id]);
      }
    };
  };

  const onCheckAll = () => {
    if (isChecked) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const onDeleteUser = () => {
    const userID = selectedUsers;
    for (const el of userID) {
      onDelete(el);
    }
  };

  const onDelete = async (id) => {
    const response = await deleteUserAdmin(id);
    if (response.status === 204) {
      alert('정상 삭제');
      onGetUsers();
    } else {
      alert('삭제 오류!');
    }
  };

  const onClickOpenModal = useCallback(
    (item, type) => {
      showModal(
        true,
        '',
        null,
        onGetUsers,
        <EditModal
          item={item}
          type={type}
          onClose={() => {
            //NOTE: 생성/수정/삭제와 같이 데이터를 변경하는 API를 사용한다면 -> API 요청 완료 후에 재요청을 해야한다~
            modalOption.onClose();
            //onGetReviews();
          }}
        />,
      );
    },
    [modalOption],
  );

  useEffect(() => {
    onGetUsers();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    const response = await getUsers(currentPage, pageLimit);
    const count = await countUsers();
    if (response.status === 200) {
      const items = [...response.data.data];
      setIsChecked(false);
      setSelectedUsers([]);
      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setUsers(items);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageLimit]);

  return (
    <main className={styles.wrapper}>
      <AdminLNB />
      <section className={styles.allSection}>
        <p className={styles.topMenu}>
          <span className={styles.menuLeft}>
            <CheckBox
              className={styles.check}
              checked={isChecked}
              onChange={onCheckAll}
              onClick={onClick}
            />
            전체선택
          </span>
          <span className={styles.menuRight}>
            <Button width={'long'} color={'secondary'} onClick={onDeleteUser}>
              선택 삭제
            </Button>
            <SearchBox
              className={styles.searchBox}
              placeholder="이름, 닉네임, 이메일"
              onChange={handleSubmit}
            />
          </span>
        </p>
        <p className={styles.secondMenu}>
          <TableMenu tableName="users" />
        </p>
        <p className={styles.table}>
          <div>
            <table className={userStyle.users}>
              {users.map((user, idx) => {
                const time = user.createdAt;
                return (
                  <td key={idx} className={userStyle.elements}>
                    <CheckBox
                      className={userStyle.check}
                      checked={selectedUsers.includes(user.id)}
                      onChange={onCheckUser(user.id)}
                    />
                    <span>{user.email}</span>
                    <span>
                      {user.name ?? '-'} ({user.nickname ?? '-'})
                    </span>
                    <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
                    {selectedUsers.includes(user?.id) && (
                      // NOTE: 수정 버튼은 오른쪽 끝에 위치하거나, 삭제 버튼 옆에 두면 좋다.
                      <Button
                        className={styles.editBtn}
                        children="수정"
                        width={'short'}
                        color={'secondary'}
                        onClick={() => onClickOpenModal(user, 'user')}
                      ></Button>
                    )}
                  </td>
                );
              })}
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </p>
      </section>
      <Modal modalOption={modalOption} modalSize="small" />
    </main>
  );
};

export default ManageUsersPage;
