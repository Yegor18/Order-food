const initialState = {
    menu: [],
    loading:true,
    error:false,
    items: [],
    dataItems: {sum:0},
}

const reducer = (state = initialState, action) => {
    const {menu,items,dataItems} = state;
    switch (action.type){
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading:false,
                error:false,
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: menu,
                loading:true,
                error:false,
            };
         case 'MENU_ERROR':
             return {
                 ...state,
                menu: menu,
                loading:false,
                error:true,
             };
         case 'ITEM_ADD_TO_CART':
             const idd = action.payload;
             let itemMenu = menu.find(item => item.id === idd);
             let countItem = items.find(item => item.id === idd);
             dataItems.sum = dataItems.sum + itemMenu.price;
             if (countItem === undefined)
             {
                 const newItem = {
                 title: itemMenu.title,
                 price:itemMenu.price,
                 url:itemMenu.url,
                 id:itemMenu.id,
                 count:1,
            } 
            return {
                ...state,
                items: [
                    ...items,
                    newItem
                ]
            }
            }
            else
            {

                const newItem = {
                    title: itemMenu.title,
                    price:itemMenu.price,
                    url:itemMenu.url,
                    id:itemMenu.id,
                    count: countItem.count + 1}
                const cloneItems = items;
                const itemIndex = items.findIndex(item => item.id === idd);
                    cloneItems.splice(itemIndex, 1, newItem);

            return {
                 ...state, items: cloneItems
                }
            }
            
             case 'ITEM_REMOVE_FROM_CART':
                const idx = action.payload;
                console.log(dataItems.sum);
                const itemIndex = items.findIndex(item => item.id === idx);
                dataItems.sum -=items[itemIndex].price;
                if (items[itemIndex].count === 1)
                return {
                 ...state,
                 items: [
                     ...items.slice(0, itemIndex),
                     ...items.slice(itemIndex+1)
                 ]
             }
             else
             {
                const cloneItems = items;
                
                const newItem = {
                    title: items[itemIndex].title,
                    price:items[itemIndex].price,
                    url:items[itemIndex].url,
                    id:items[itemIndex].id,
                    count: 
                    items[itemIndex].count - 1}
                    
                    cloneItems.splice(itemIndex, 1, newItem);
                console.log(cloneItems);    
                return {
                    ...state, items: cloneItems
                   }
             }
         default:
             return state;
    }
}

export default reducer;