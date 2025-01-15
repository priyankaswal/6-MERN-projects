export const TodoItemsReducer = (currentItems, action) => {
  let newItems = currentItems;
  switch (action.type) {
    case 'ADD_ITEM': {
      let {id, todoText , todoDate} = action.payload;
      newItems = [...currentItems, { id, todoText, todoDate }];
      break;
    }
    case 'DELETE_ITEM':
      newItems = currentItems.filter((item) => item.id != action.payload.todoId);
      break;
    case 'LOAD_ALL_ITEMS':
      return action.payload.allItems;
    default:
      break;
  }
  return newItems;
};