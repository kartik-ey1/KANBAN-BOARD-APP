import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import List from './Components/List/List';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const statusList = ['In progress', 'Backlog', 'Todo', 'Done', 'Cancelled'];
  const userList = ['Anoop sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh'];
  const priorityList = [
    { name: 'No priority', priority: 0 },
    { name: 'Low', priority: 1 },
    { name: 'Medium', priority: 2 },
    { name: 'High', priority: 3 },
    { name: 'Urgent', priority: 4 },
  ];

  const [groupValue, setGroupValue] = useState(getStateFromLocalStorage() || 'status');
  const [orderValue, setOrderValue] = useState('title');
  const [ticketDetails, setTicketDetails] = useState([]);
  const [theme, setTheme] = useState('light');

  function saveStateToLocalStorage(state) {
    localStorage.setItem('groupValue', JSON.stringify(state));
  }

  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem('groupValue');
    if (storedState) {
      return JSON.parse(storedState);
    }
    return null;
  }

  useEffect(() => {
    saveStateToLocalStorage(groupValue);

    async function fetchData() {
      try {
        const response = await fetch('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
        const data = await response.json();
        refactorData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [orderDataByValue, groupValue]);

  function refactorData(data) {
    let ticketArray = [];
    if (data && data.tickets && data.users) {
      for (let i = 0; i < data.tickets.length; i++) {
        for (let j = 0; j < data.users.length; j++) {
          if (data.tickets[i].userId === data.users[j].id) {
            let ticketJson = { ...data.tickets[i], userObj: data.users[j] };
            ticketArray.push(ticketJson);
          }
        }
      }
    }
    setTicketDetails(ticketArray);
    orderDataByValue(ticketArray);
  }

  function orderDataByValue(cardsArray) {
    if (orderValue === 'priority') {
      cardsArray.sort((a, b) => b.priority - a.priority);
    } else if (orderValue === 'title') {
      cardsArray.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    setTicketDetails(cardsArray);
  }

  function handleGroupValue(value) {
    setGroupValue(value);
  }

  function handleOrderValue(value) {
    setOrderValue(value);
  }

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <div className={`app-container ${theme}`}>
        <Navbar
          groupValue={groupValue}
          orderValue={orderValue}
          handleGroupValue={handleGroupValue}
          handleOrderValue={handleOrderValue}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <section className="board-details">
          <div className="board-details-list">
            {(() => {
              switch (groupValue) {
                case 'status':
                  return statusList.map((listItem) => (
                    <List
                      key={listItem}
                      groupValue="status"
                      orderValue={orderValue}
                      listTitle={listItem}
                      listIcon=""
                      statusList={statusList}
                      ticketDetails={ticketDetails}
                    />
                  ));
                case 'user':
                  return userList.map((listItem) => (
                    <List
                      key={listItem}
                      groupValue="user"
                      orderValue={orderValue}
                      listTitle={listItem}
                      listIcon=""
                      userList={userList}
                      ticketDetails={ticketDetails}
                    />
                  ));
                case 'priority':
                  return priorityList.map((listItem) => (
                    <List
                      key={listItem.priority}
                      groupValue="priority"
                      orderValue={orderValue}
                      listTitle={listItem.priority}
                      listIcon=""
                      priorityList={priorityList}
                      ticketDetails={ticketDetails}
                    />
                  ));
                default:
                  return null;
              }
            })()}
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;
