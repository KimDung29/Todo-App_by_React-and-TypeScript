import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

interface TodoItem {
  id: number;
  inputValue: string;
  completed: boolean;
}

const Todo = () => {
  const [listItems, setListItems] = useState<TodoItem[]>([
    {
      id: 0,
      inputValue: 'Học react',
      completed: true
    },
    {
      id: 1,
      inputValue: 'Học java',
      completed: false
    },
    {
      id: 2,
      inputValue: 'Học angular',
      completed: false
    },
    {
      id: 3,
      inputValue: 'Học Net',
      completed: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filterItems, setFilterItems] = useState('all');
 

  const handleAddItem = () => {
    const newItem: TodoItem = { id: listItems.length, inputValue, completed:false }; // tạo list item mới
    setListItems([...listItems, newItem]); // copy list cũ và thêm item mới
    setInputValue('');
  };

  const handleKeyDownInput = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLInputElement; // ép target của event tại thẻ input
    if (event.key === 'Enter') {
      handleAddItem(); // chạy hàm này khi event tại 'Enter'
      target.value = ''; // xóa value sau event
    }
  };
 
  const handleDeleteItem = (id: number) => {
    const newItems = listItems.filter((item) =>  item.id !== id); // lấy all items còn lại trừ item được click vào
    setListItems(newItems); // cập nhật lại list do có sự thay đổi
  };

  const handleFilterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value; // Lấy giá trị filter được chọn
    setFilterItems(selectedFilter); // Cập nhật filter state
  };

  return (
    <DivTodoApp>
      <h1>Todo List</h1>
      <DivInputContainer>
        <InputField 
        type="text" value={inputValue} 
        onKeyDown={handleKeyDownInput} 
        onChange={(e) => setInputValue(e.target.value)} />
        <ButtonPlus onClick={handleAddItem} >+</ButtonPlus>
      </DivInputContainer>
      <DivList>
        <ListAndSelect >
          <Paragraph >List: </Paragraph>
          <FormSelect  onChange={(e) => handleFilterSelect(e)} >
            <option key={1} value='all' >All</option>
            <option key={2} value='todo' >To do</option>
            <option key={3} value='done' >Done</option>
          </FormSelect>
          
        </ListAndSelect>
        {listItems.filter((item) => {
          if (filterItems === 'all') {
            return true; // Hiển thị tất cả items nếu value là 'all'
          } else if (filterItems === 'todo') {
            return !item.completed; // Hiển thị items chưa hoàn thành nếu value là 'todo'
          } else {
            return item.completed; // Hiển thị items đã hoàn thành nếu value là 'done'
          }
        }).map((item, index) => {
          return (
            <>
              <ListNewItem 
              >
                <Paragraph
                className={`toggleCheck ${item.completed ? 'checked' : ''}`} // Thêm class 'checked' nếu item đã hoàn thành
                key={item.id} 
                onClick={() => {
                  const newItems = listItems.map((todo) => {
                    if (todo.id === item.id) {
                      return {
                        ...todo, // copy toàn bộ state cũ
                        completed: !todo.completed, // Đổi state uncompleted(false) => completed(true) khi user click vào item
                      };
                    } else {
                      return todo;
                    }
                  });
                  setListItems(newItems); // Cập nhật list mới(do đã có sự thay đổi)
                }}
                >
                {index + 1}. {item.inputValue}
                </Paragraph>

                <DivDelete className='delete'
                onClick={() => handleDeleteItem(item.id)}
                >
                  <i key={'a'} className="fas fa-trash"></i>
                </DivDelete>
              </ListNewItem>
            </>
          )}
        )}

      </DivList>
    </DivTodoApp>
)
}
export default Todo;


const DivTodoApp = styled.div`
  margin: auto;
  max-width: 50vw;
  text-align: center;
`;

const DivInputContainer = styled.div`
  width: 100%;
  display: flex;
`;

const InputField = styled.input`
  border: 1px solid #fbbf24;
  border-radius: 5px;
  padding: 9px;
  margin-right: 10px;
  width: 90%;
  outline: none;
  &:focus {
  border: 2px solid #b45309;
  }
`;

const ButtonPlus = styled.button`
  width: 10%;
  text-align: center;
  background-color: #10b981;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 0;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    background-color: #10b981a0;
  }
`;
const DivList = styled.div`
  margin: 20px 0;
  background-color: #fef3c7;
  border-radius: 5px;
`;

const FormSelect = styled.select`
  border: 1px solid #fbbf24;
  border-radius: 5px;
  padding: 5px;
`;

const ListAndSelect = styled.form`
  color: #b45309;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 10px;
`;

const ListNewItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 10px;
  &:hover {
    cursor: pointer;
  }
  &:hover > .delete {
    opacity: 1;
    color: #b45309;
    background-color: #fef3c7;
    outline: none;
    border: none;
  }
`;

const DivDelete = styled.div`
  opacity: 0;
  flex-basis: 10%;
  &:hover {
    cursor: pointer;
  }
`;
const Paragraph = styled.p`
  margin: 0;
`;
