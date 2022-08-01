import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Dropdown, Space, Menu, DatePicker, Select, message, Modal } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Dashboardnav from './dashboardnav'
import HeaderNav from '../headernav';
import { db } from '../Firebase/firebase'
import { addDoc, collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import moment from 'moment';
import Cookies from 'universal-cookie';
import { async } from '@firebase/util';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const cookies = new Cookies();

const { Option, OptGroup } = Select;



const EditableTable = (props) => {
  const [keyWord, setKeyWord] = useState([])
  const [wordChange, setWordChange] = useState()
  const [wordStatus, setWordStatus] = useState()
  const [data, _data] = useState([]);
  const [website, setWebSite] = useState()
  const [completedDate, setCompletedDate] = useState()
  const [firstTime, setFirstTime] = useState(false)
  const [name, setName] = useState()
  const usersRef = collection(db, 'Users')
  const tasksRef = collection(db, 'Tasks')

  const userData = cookies.get('userData');

  const usersIndividualRef = doc(db, 'Users', userData?.id);

  useEffect(() => {
    fetchData();
    setFirstTime(true);
    setCompletedDate(moment().format('DD/MM/YYYY'))
  }, [])

  useEffect(() => {
    fetchData();
  }, [props])

  useEffect(() => {
    if (firstTime) {
      _data([...data, {}])
    }
  }, [props?.addRow])

  const fetchData = async () => {
    const userData = await getDocs(usersRef);
    const taskData = await getDocs(tasksRef);

    const usersData = userData.docs.map((doc) => ({ ...doc.data(), created_at: moment(doc.created_at), id: doc.id }));
    const tasksData = taskData.docs.map((doc) => ({ ...doc.data(), created_at: moment(doc.created_at), id: doc.id }));

    const usersDataTab = tasksData?.filter(user => user?.name == props?.name)
    const userCookieData = cookies.get('userData');
    const userEmployee = tasksData?.filter(user => user.name == userCookieData.name)
    let userTable = [];
    if (userCookieData?.isAdmin) {
      usersDataTab[0]?.tasks?.map((user, i) => {
        user?.keywordsArr?.map(key =>
          userTable.push({
            date: user.date,
            taskStatus: user?.keywordsArr[i]?.keyword?.taskStatus,
            totalWords: user?.keywordsArr[i]?.keyword?.totalWords || 'NA',
            completedDate: user?.keywordsArr[i]?.keyword?.completedDate || 'NA',
            wordsCount: user?.keywordsArr[i]?.keyword?.wordsCount || 'NA',
            approval: user?.keywordsArr[i]?.keyword?.approval || 'Not yet approved',
            comments: user?.keywordsArr[i]?.keyword?.comments || 'No Comments yet',
            website: user?.keywordsArr[i]?.keyword?.website || 'NA',
            keyword: key?.keyword?.value || 'NA',
            name: props?.name,
            id: usersDataTab[0]?.id + key?.keyword?.value
          }))
      })
    } else {
      userEmployee[0]?.tasks?.map((user, i) => {
        user?.keywordsArr?.map(key =>
          userTable.push({
            date: user.date,
            taskStatus: user?.keywordsArr[i]?.keyword?.taskStatus,
            totalWords: user?.keywordsArr[i]?.keyword?.totalWords || 'NA',
            completedDate: user?.keywordsArr[i]?.keyword?.completedDate || '-',
            wordsCount: user?.keywordsArr[i]?.keyword?.wordsCount || 'NA',
            approval: user?.keywordsArr[i]?.keyword?.approval || 'Not yet approved',
            comments: user?.keywordsArr[i]?.keyword?.comments || 'No Comments yet',
            website: user?.keywordsArr[i]?.keyword?.website || 'NA',
            keyword: key?.keyword?.value || 'NA',
            name: props?.name,
            id: usersDataTab[0]?.id + key?.keyword?.value
          }))
      })
    }

    _data(userTable)

  }

  const handleKeyChange = (e, record) => {
    let keyId = record.id + e.target.value;
    if (keyWord.length) {
      keyWord?.map(word => {
        console.log('word', word, keyId);
        if (word.key == keyId) {
          let filter = keyWord?.filter(word => word.key !== keyId)
          setKeyWord([...filter, { key: keyId, value: e.target.value }])
        } else {
          keyWord.push({ key: keyId, value: e.target.value })
        }
      })
    }

    if (!keyWord.length) {
      setKeyWord([{ key: keyId, value: e.target.value }])
    }
    console.log('keyWord', keyWord);
  }

  const handleWordCountChange = (e) => {
    setWordChange(e.target.value);

  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleTaskStatus = (e) => {
    setWordStatus(e)
  }

  const handleWebsiteChange = (e) => {
    setWebSite(e.target.value)
  }

  const handleCompletedDate = (e) => {
    setCompletedDate(moment(e).format('DD/MM/YYYY'))
  }

  const handleSubmit = async () => {
    const getData = await getDoc(usersIndividualRef);
    const getTask = await getDoc(usersIndividualRef);
    let Date = moment().format('YYYY/MM/DD')

    const getUserData = getData?.data();
    const dataWithoutCurrentDate = getUserData?.date?.filter(d => d.date !== Date);
    const dataWithCurrentDate = getUserData?.date?.filter(d => d.date == Date);
    if (!dataWithCurrentDate) {
      message.error('Please clockIn to create Task');
    }
    const data = await updateDoc(usersIndividualRef, {
      date: dataWithoutCurrentDate ? [...dataWithoutCurrentDate,
      {
        ...dataWithCurrentDate[0],
        keywords: keyWord,
        wordsCount: wordChange,
        completedDate: completedDate,
        website: website,
        taskStatus: wordStatus
      }]
        : [
          {
            ...dataWithCurrentDate[0],
            keywords: keyWord,
            wordsCount: wordChange,
            completedDate: completedDate,
            website: website,
            taskStatus: wordStatus
          }]
    });
    message.success('Task Created successfully');
    fetchData();

  }

  const columns = [
    {
      title: 'Date',
      width: 160,
      dataIndex: 'date',
      fixed: 'left',
      render: ((text) => text ? text :
        <input type='text' style={{ width: userData?.isAdmin ? '150px' : 0 }} value={text || name} onChange={handleNameChange}></input>
      )
    },
    {
      title: userData?.isAdmin ? 'Name' : '',
      width: userData?.isAdmin ? 160 : 0,
      dataIndex: 'name',
      fixed: 'left',
      render: ((text) => text ? text : '')
    },
    {
      title: 'Keyword',
      width: '15%',
      dataIndex: 'keyword',
      render: ((text, record) => {
        let keywordText = keyWord?.filter(key => key.key == record.id);
        console.log('keyword', keyWord, record, keywordText, text);
        return (
          userData?.isAdmin ? <input type='text' style={{ width: '150px' }} value={keyWord?.length !== 0 ? keywordText.value : text} onChange={(e) => handleKeyChange(e, record)}></input> : text
        )
      })
    },
    {
      title: 'Status',
      dataIndex: 'taskStatus',
      width: '15%',
      render: ((text) => {
        return (
          <Select style={{ width: '150px' }} placeholder='Status' defaultValue={wordStatus || text || 'Not Available'} onChange={handleTaskStatus}>
            <Option value='Writing'>Writing</Option>
            <Option value='Submitting For Review'>Submitting For Review</Option>
          </Select>
        )
      })
    },
    {
      title: 'Completed Date',
      dataIndex: 'completedDate',
      width: '15%',
      render: ((text) => {
        return (<DatePicker onChange={handleCompletedDate} defaultValue={moment(text ? text : completedDate, 'DD/MM/YYYY')} format={'DD/MM/YYYY'} />)
      })
    },
    {
      title: 'Words Count',
      dataIndex: 'wordsCount',
      width: '15%',
      render: ((text) => {
        return (
          <input type='text' style={{ width: '100px' }} value={text || wordChange} onChange={handleWordCountChange}></input>
        )
      })
    },
    {
      title: 'Approval',
      dataIndex: 'approval',
      width: '15%',
      render: ((text) => {
        return (userData?.isAdmin ? <input type='text' style={{ width: '100px' }} value={text || wordChange} onChange={handleWordCountChange}></input>
          : text ? text : 'Not Yet Approved')
      })
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      width: '15%',
      render: ((text) => {
        return (userData?.isAdmin ? <input type='text' style={{ width: '100px' }} value={text || wordChange} onChange={handleWordCountChange}></input>
          : text ? text : 'Not Yet Approved')
      })
    },
    {
      title: 'Website',
      dataIndex: 'website',
      width: '15%',
      render: ((text) => {
        return (
          <input type='text' style={{ width: '100px' }} value={text || website} onChange={handleWebsiteChange}></input>
        )
      })
    },
    {
      title: 'Submit',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <Button onClick={handleSubmit}>Submit</Button>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1800,
        }}
      />
    </>)
};

export default function Task() {
  const [addRow, setAddRow] = useState()
  const [taskUserName, setTaskUserName] = useState()
  const [isModalVisible, _isModalVisible] = useState()
  const [keyWordsName, setKeywordsName] = useState([])
  const [addInput, setAddInput] = useState([{ value: "" }])
  const [tasksData, setTasksData] = useState()
  const [fetchData, _fetchData] = useState(false)

  const userData = cookies.get('userData');
  const usersRef = collection(db, 'Users');
  const tasksRef = collection(db, 'Tasks');

  let taskRef;

  const onChange = (key) => {
    setKeywordsName(key)
  };

  useEffect(async () => {
    const userData = await getDocs(usersRef);
    const taskData = await getDocs(tasksRef);

    const usersData = userData.docs.map((doc) => ({ ...doc.data(), created_at: moment(doc.created_at), id: doc.id }));
    const tasksData = taskData.docs.map((doc) => ({ ...doc.data(), created_at: moment(doc.created_at), id: doc.id }));
    setTasksData(tasksData);
    setTaskUserName(usersData);
  }, [])

  const handleKeywordsModal = (user) => {
    _isModalVisible(true);
  }

  const handleOk = async () => {
    _isModalVisible(false)
    const date = moment().format('DD/MM/YYYY');
    const filterTaskData = tasksData?.filter(task => task.name == keyWordsName)

    const dateFilterTask = filterTaskData[0]?.tasks?.filter(task => { return task.date !== moment().format('DD/MM/YYYY').toString() })
    const id = filterTaskData[0]?.id;
    if (filterTaskData?.length) {
      taskRef = doc(db, 'Tasks', id)
      await updateDoc(taskRef, {
        name: keyWordsName,
        tasks: [...dateFilterTask,
        {
          date: date,
          keywordsArr: addInput.map(key => { return { keyword: key } })
        }
        ]

      })
    } else {
      const addRes = await addDoc(tasksRef, { name: keyWordsName, tasks: [{ date: moment().format('DD/MM/YYYY'), keywordsArr: addInput.map(key => { return { keyword: key } }) }] });
    }
    // const addUserNameKeyword = taskUserName?.filter(task => task.name == keyWordsName)

    let Date = moment().format('YYYY/MM/DD HH:mm:ss').toString();

    setAddInput([{ value: '' }])
    _fetchData(true)

  }

  const handleCancel = () => {
    _isModalVisible(false)
    setAddInput([{ value: '' }])
  }

  const handleAddClick = () => {
    setAddInput(s => {
      return [...s, { value: '' }]
    })
  }

  const handleInputChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setAddInput(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  }

  return (
    <div>
      <HeaderNav />
      <div className='dashboard'>
        <Dashboardnav />
        <div className='dashboardContent'>
          {/* {userData?.isAdmin ? <Button onClick={() => addRow ? setAddRow(false) : setAddRow(true)} type='primary'>Add Task Row</Button> : ''} */}
          {userData?.isAdmin ?
            <div>
              <Modal title={`Add Key words for ${keyWordsName}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <button onClick={handleAddClick}>Add</button>
                  {addInput?.map((add, i) => <div style={{ display: 'flex' }}>KeyWord {i + 1} : <input type="text" onChange={handleInputChange} name="" id={i} /> </div>)}
                </div>
              </Modal>
              <Tabs defaultActiveKey="Elango" onChange={onChange}>

                {taskUserName?.map((t, i) =>
                  < TabPane tab={t?.name} key={t?.name} >
                    <Button onClick={handleKeywordsModal}>Add Key words for {t?.name}</Button>
                    <EditableTable name={t.name} fetchData={fetchData} addRow={addRow} />
                  </TabPane>
                )}
              </Tabs>
            </div>
            : <EditableTable addRow={addRow} />}
        </div>

      </div>
    </div >
  )
}
