import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import './App.css';

import List from './Components/List/List';
import Navbar from './Components/Nav/Nav';

function App() {
  const statusList = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  const priorityList = [
    { name: 'No priority', priority: 0 },
    { name: 'Urgent', priority: 4 },
    { name: 'High', priority: 3 },
    { name: 'Medium', priority: 2 },
    { name: 'Low', priority: 1 }
  ];

  const [groupValue, setGroupValue] = useState(getGroupValueFromLocalStorage() || 'status');
  const [orderValue, setOrderValue] = useState(getOrderValueFromLocalStorage() || 'title');
  const [ticketDetails, setTicketDetails] = useState([]);
  const [userList, setUserList] = useState([]);

  const orderDataByValue = useCallback(async (cardsArray) => {
    if (orderValue === 'priority') {
      cardsArray.sort((a, b) => b.priority - a.priority);
    } else if (orderValue === 'title') {
      cardsArray.sort((a, b) => {
        const A = a.title.toLowerCase();
        const B = b.title.toLowerCase();
        return A.localeCompare(B);
      });
    }
    await setTicketDetails(cardsArray);
  }, [orderValue, setTicketDetails]);

  function saveStateToLocalStorage(groupState, orderState) {
    localStorage.setItem('groupValue', JSON.stringify(groupState));
    localStorage.setItem('orderValue', JSON.stringify(orderState));
  }

  function getGroupValueFromLocalStorage() {
    const storedGroupState = localStorage.getItem('groupValue');
    return storedGroupState ? JSON.parse(storedGroupState) : null; 
  }

  function getOrderValueFromLocalStorage() {
    const storedOrderState = localStorage.getItem('orderValue');
    return storedOrderState ? JSON.parse(storedOrderState) : null; 
  }

  useEffect(() => {
    saveStateToLocalStorage(groupValue, orderValue);
    
    async function fetchData() {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      await refactorData(response);
    }
    fetchData();

    async function refactorData(response) {
      let ticketArray = [];
      let usersArray = [];

      if (response.status === 200) {
        const users = response.data.users;
        usersArray = users.map(user => user.name);
        setUserList(usersArray);

        for (let i = 0; i < response.data.tickets.length; i++) {
          for (let j = 0; j < response.data.users.length; j++) {
            if (response.data.tickets[i].userId === response.data.users[j].id) {
              let ticketJson = { ...response.data.tickets[i], userObj: response.data.users[j] };
              ticketArray.push(ticketJson);
            }
          }
        }
      }
      await setTicketDetails(ticketArray);
      orderDataByValue(ticketArray);
    }
  }, [orderDataByValue, groupValue, orderValue]);

  function handleGroupValue(value) {
    setGroupValue(value);
    console.log(value);
  }

  function handleOrderValue(value) {
    setOrderValue(value);
    console.log(value);
  }

  return (
    <>
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <section className="board-details">
        <div className="board-details-list">
          {
            {
              'status': <>
                {statusList.map((listItem) => {
                  return (
                    <List
                      groupValue='status'
                      orderValue={orderValue}
                      listTitle={listItem}
                      listIcon=''
                      statusList={statusList}
                      ticketDetails={ticketDetails}
                    />
                  );
                })}
              </>,
              'user': <>
                {userList.map((listItem) => {
                  return (
                    <List
                      groupValue='user'
                      orderValue={orderValue}
                      listTitle={listItem}
                      listIcon=''
                      userList={userList}
                      ticketDetails={ticketDetails}
                    />
                  );
                })}
              </>,
              'priority': <>
                {priorityList.map((listItem) => {
                  return (
                    <List
                      groupValue='priority'
                      orderValue={orderValue}
                      listTitle={listItem.priority}
                      listIcon=''
                      priorityList={priorityList}
                      ticketDetails={ticketDetails}
                    />
                  );
                })}
              </>
            }[groupValue]
          }
        </div>
      </section>
    </>
  );
}

export default App;
